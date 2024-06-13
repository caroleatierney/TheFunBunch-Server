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
// *************** ROUTES *****************
// ****************************************
// Get all Blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const data = await Blogs.find({});
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while fetching blogs.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching blogs..." });
    return;
  }
});

// Get note by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = await Blogs.findById(blogId);
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while fetching blogs.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching blogs..." });
    return;
  }
});

// Create a blog
app.post("/api/blogs", async (req, res) => {
  try {
    // send data through a body
    const { title, image, date, description, blogArray } = req.body;

    const data = await Blogs.create({
      title,
      image,
      date,
      description,
      blogArray,
    });
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while creating a blog.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating a blog..." });
    return;
  }
});

// Update a blog
app.put("/api/blogs/:id", async (req, res) => {
  try {
    // send data through a body
    const blogId = req.params.id;
    const { title, image, date, description, blogArray } = req.body;

    const data = await Blogs.findByIdAndUpdate(blogId, {
      title,
      image,
      date,
      description,
      blogArray,
    });
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while updating a blog.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a blog..." });
    return;
  }
});

// Delete a blog by ID
app.delete("/api/blogs/:id", async (req, res) => {
  try {

    const blogId = req.params.id; 
    const data = await Blogs.findByIdAndDelete(blogId);
    // res.json(data)

    if (!data) {
      throw new Error("An error occurred while updating a blog.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a blog..." });
    return;
  }
});

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
