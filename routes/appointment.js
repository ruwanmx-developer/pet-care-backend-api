const express = require("express");
const User = require("../model/user");
const Appointment = require("../model/appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/new-appointment", auth, async (req, res) => {
  try {
    let { _id, date, description } = req.body;
    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "Please Login",
      });
    }

    const appointment = await Appointment.create({
      user: user,
      date: date,
      state: "Pending",
      description: description,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment Created Successfully",
      appointment: appointment,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err,
    });
  }
});

module.exports = router;
