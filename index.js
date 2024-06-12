// ******************************
// ******* DEPENDENCIES *********
// ******************************
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Blogs = require("./models/Blogs");

// ******************************
// ******** Express App *********
// ******************************
const app = express();

// ******************************
// ************ PORT ************
// ******************************
const PORT = process.env.PORT || 8000;

// ******************************
// ***********  MONGO ***********
// ******************************
connectDB();

// ******************************
// ********  MIDDLEWARE *********
// ******************************
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// ******************************
// **********  DATABASE *********
// ******************************

// ****************************************
// ************** LISTENER ****************
// ****************************************
app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});