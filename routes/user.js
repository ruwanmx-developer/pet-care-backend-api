const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

// user register function
router.post("/register", async (req, res) => {
  try {
    let newUser = new User(req.body);
    const oldUser = await User.findOne({ email: newUser.email });

    if (oldUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist. Please Login",
      });
    }

    encPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = encPass;

    const user = await User.create({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email.toLowerCase(),
      password: encPass,
    });

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    return res.status(201).json({
      success: true,
      message: "User Registerd Successfully",
      user: user,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err,
    });
  }
});

// user login function
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(201).json({
        success: true,
        message: "User Logged In Successfully",
        user: user,
      });
    }
    return res.status(201).json({
      success: false,
      message: "Invalid Credentials",
      user: user,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err,
    });
  }
});

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
