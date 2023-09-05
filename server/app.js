/**
 * Configuring dotenv package
 */

require("dotenv").config();

/**
 * Importing express package and setting it up by calling it.
 */
const express = require("express");
const app = express();

/**
 * Importing cors package.
 */
const cors = require("cors");

const Reminder = require("./models/reminderSchema");
const { set } = require("mongoose");

/**
 * Middlewares
 *      - express.json() - To handle (parse) the json data coming in request
 *      - express.urlencoded({extended: true}) - To handle data coming from URL in encoded format
 *      - cors - To handle cross origin requests
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * Home route for testing purpose
 */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the application",
  });
});

app.get("/getAllReminders", async (req, res) => {
  try {
    const reminders = await Reminder.find({});
    res.status(200).json({
      success: true,
      reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
});

// json object for addreminder..

app.post("/addReminder", async (req, res) => {
  try {
    const { reminderMsg, remindAt } = req.body;
    if (!reminderMsg || !remindAt) {
      return res.status(400).json({
        success: false,
        message: "reminderMsg and remindAt are required",
      });
    }

    const reminder = await Reminder.create({
      reminderMsg,
      remindAt,
      isReminded: false,
    });
    res.status(200).json({
      success: true,
      reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
});

app.delete("/deleteReminder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const reminder = await Reminder.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
});

// json object for updateReminder..

app.put("/updateReminder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reminderMsg, remindAt, isReminded } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }
    const reminder = await Reminder.findByIdAndUpdate(
      id,
      {
        reminderMsg,
        remindAt,
        isReminded,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
});

// WhatsApp API initialization

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

setInterval(() => {
  const now = new Date();
  const datetime = now.toISOString(); 
  // Get the current datetime in ISO format
  // match the exact date including the date, month, year, hours, minutes and seconds..
  console.log(datetime);

  // Reminder.find({ remindAt: datetime, isReminded: false }).then((reminders) => {
  Reminder.find({}).then((reminders) => {
    // console.log("reminders: ", reminders);
    if (reminders) {
      // console.log("reminders: ", reminders);

      reminders.forEach((reminder) => {
        if (reminder.isReminded === false) {
          const now = new Date();
          if (new Date(reminder.remindAt) <= now) {
            console.log("reminder Found: ", reminder);
            client.messages
              .create({
                body: reminder.reminderMsg,
                from: "whatsapp:+14155238886",
                to: "whatsapp:+918530470684",
              })
              .then((message) => {
                console.log("Message Id: ", message.sid);
                Reminder.findByIdAndUpdate(
                  reminder._id,
                  {
                    isReminded: true,
                  },
                  { new: true }
                ).then((updatedReminder) => {
                  console.log("Reminder updated: ", updatedReminder);
                });
              });
          }
        }
      });
    }
  });
}, 60000);

// Whatsapp API
// const accountSid = "AC305c8f7c819129d49d80b1bd81d9ba86";
// const authToken = "[AuthToken]";

// client.messages
//   .create({
//     body: "hello you are setup with the reminder app..( Globally Authorized- Pavankumar Mhaske)",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+918530470684",
//   })
//   .then((message) => console.log("Message Id: ", message.sid));

module.exports = app;
