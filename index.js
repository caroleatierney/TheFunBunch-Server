// ******************************
// ******* DEPENDENCIES *********
// ******************************
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const StLuciaBlogs = require("./models/StLuciaBlogs");
// const GrandAntiguaBlogs = require("./models/GrandAntiguaBlogs");

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

// ******************************
// ********   St. Lucia  ********
// ******************************
// Get all Blogs
app.get("/api/stluciablogs", async (req, res) => {
  try {
    const data = await StLuciaBlogs.find({});
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
app.get("/api/stluciablogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = await StLuciaBlogs.findById(blogId);
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

// ?????????????
    // res.redirect("/stluciapics");

// Create a blog
app.post("/api/stluciablogs", async (req, res) => {
  try {
    // send data through a body
    const { title, image, date, description, blogArray } = req.body;

    const data = await StLuciaBlogs.create({
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
app.put("/api/stluciablogs/:id", async (req, res) => {
  try {
    // send data through a body
    const blogId = req.params.id;
    const { title, image, date, description, blogArray } = req.body;

    const data = await StLuciaBlogs.findByIdAndUpdate(blogId, {
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
app.delete("/api/stluciablogs/:id", async (req, res) => {
  try {

    const blogId = req.params.id; 
    const data = await StLuciaBlogs.findByIdAndDelete(blogId);
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
