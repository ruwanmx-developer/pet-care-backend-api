const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
  date: { type: Date, default: null },
  state: { type: String, unique: true },
  description: { type: String },
});

module.exports = mongoose.model("appointment", appointmentSchema);
