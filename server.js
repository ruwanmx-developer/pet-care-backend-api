// import node modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// import project modules
const userRoutes = require("./routes/user");
const appointmentRoutes = require("./routes/appointment");

// create app
const app = express();

// app middlewares
app.use(bodyParser.json());
app.use(cors());

// app routes
app.use(userRoutes);
app.use(appointmentRoutes);

// connect database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Connection Error : " + err));

// start application
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
