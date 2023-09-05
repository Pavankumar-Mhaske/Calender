import React, { useEffect, useState } from "react";
import Calender from "./components/calender.jsx";
import "./App.css";
import axios from "axios";

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindeAt, setRemindeAt] = useState(new Date());
  const [reminderList, setReminderList] = useState([]);
  // const [applySlotProps, setApplySlotProps] = useState(false); // New state variable

  // useEffect() hook that will only run once when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:4000/getAllReminders")
      .then((response) => {
        console.log("response in 1st getReminder : ", response);
        setReminderList(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  // useEffect(() => {
  //   axios

  //     .get("http://localhost:4000/getAllReminders") // get all reminders from db
  //     .then((response) => {
  //       console.log("response in getReminder : ", response);
  //       setReminderList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // }, [reminderList]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios
  //       .get("http://localhost:4000/getAllReminders")
  //       .then((response) => {
  //         console.log("response in 2nd getReminder : ", response);
  //         // setReminderList(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [reminderList]);

  const addReminder = async () => {
    console.log("reminderMsg : ", reminderMsg);
    console.log("remindeAt : ", remindeAt);
    const remindeAtISO = remindeAt.toISOString();

    await axios
      .post("http://localhost:4000/addReminder", {
        reminderMsg: reminderMsg,
        remindAt: remindeAtISO,
      })
      .then(async (res) => {
        console.log("response in addReminder : ", res);

        // get all reminders from db and set reminderList on every addReminder call
        await axios
          .get("http://localhost:4000/getAllReminders")
          .then((response) => {
            console.log(
              "response in getReminder  inside the addReminder : ",
              response
            );
            setReminderList(response.data);
          })
          .catch((error) => {
            console.log(
              "error while getting reminders List in addReminder",
              error
            );
          });
      })
      .catch((error) => {
        console.log("error in addReminder : ", error);
      });

    setReminderMsg("");
    setRemindeAt(new Date());
  };

  const deleteReminder = (id) => {
    axios.delete(`http://localhost:4000/deleteReminder/${id}`).then((res) => {
      console.log("response in deleteReminder : ", res);
      // get all reminders from db and set reminderList on every addReminder call
      axios
        .get("http://localhost:4000/getAllReminders")
        .then((response) => {
          console.log(
            "response in getReminder  inside the deleteReminder : ",
            response
          );
          setReminderList(response.data);
        })
        .catch((error) => {
          console.log(
            "error while getting reminders List in deleteReminder : ",
            error
          );
        });
    });
  };

  return (
    <div className="App">
      {/* {console.log("reminderList is : ", reminderList)} */}
      <div className="homepage">
        <div className="homepage_header">
          <h1>remind me 🙋🏻‍♂️</h1>
          <input
            type="text"
            placeholder="Reminder notes here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />

          <Calender setRemindeAt={setRemindeAt} />
          <div className="button" onClick={addReminder}>
            submit
          </div>
        </div>

        <div className="homepage_body">
          {reminderList.reminders ? (
            reminderList.reminders.map((reminder) => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <div className={`flex-container`}>
                  <h3>Remind me at:</h3>
                  <h5>
                    {new Date(
                      reminder.remindAt.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })
                    ).toLocaleString()}
                  </h5>
                </div>

                <p>
                  {String(
                    new Date(
                      reminder.remindAt.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })
                    )
                  )}
                </p>
                {/* new Date(reminder.remindAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })) */}

                <div
                  className="button"
                  onClick={() => deleteReminder(reminder._id)}
                >
                  Delete
                </div>
              </div>
            ))
          ) : (
            <p>No reminders available.</p>
          )}
          {/* <h2>Reminder notes</h2>
          <h3>Remind me at:</h3>
          <p> 26/05/2023 @2AM</p>
          <div className="button" onClick={deleteReminder}>
            Delete
          </div> */}
        </div>
      </div>
      {/* </div> */}
      {/* <Calender /> */}
    </div>
  );
}

export default App;
