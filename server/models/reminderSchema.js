/**
 * Importing mongoose
 */
const mongoose = require("mongoose");

/**
 * Destructuring from mongoose
 *      - Schema Constructor
 *      - model method
 */
const { Schema, model } = mongoose;

const reminder = new Schema({
  reminderMsg: {
    type: String,
    required: true,
  },
  remindAt: {
    // type: Date ,
    type: String ,
    required: true,
  },
  isReminded: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Reminder", reminder);
