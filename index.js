// ******************************
// ******* DEPENDENCIES *********
// ******************************
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const StLuciaBlogs = require("./models/StLuciaBlogs");
const GrandAntiguaBlogs = require("./models/GrandAntiguaBlogs");

// ******************************
// ******** Express App *********
// ******************************
const app = express();

// ******************************
// ************ PORT ************
// ******************************
const PORT = process.env.PORT || 8000;

// ******************************
// ********  MIDDLEWARE *********
// ******************************
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// ******************************
// **** CONNECT TO MONGO DB *****
// ******************************
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// ****************************************
// *************** ROUTES *****************
// ****************************************

// ******************************
// ********   St. Lucia  ********
// ******************************
// Get all Blogs
console.log("Before App .get");  
app.get("/api/stluciablogs", async (req, res) => {
  console.log("After App .get");  
  try {
    const data = await StLuciaBlogs.find({});
    // res.json(data)
  console.log("In try");  
    if (!data) {
        console.log("In no data");  
      throw new Error("An error occurred while fetching blogs.");
    }
        console.log("good 201");  
    res.status(201).json(data);
  } catch (error) {
      console.log("In error");  
    res
      .status(500)
      .json({ error: "An error occurred while fetching blogs..." });
    return;
  }
});

// Get blog by ID
app.get("/api/stluciablogs/:id", async (req, res) => {
  try {
    const data = await StLuciaBlogs.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog." });
  }
});

// Create a blog
app.post("/api/stluciablogs", async (req, res) => {
  try {
    const data = await StLuciaBlogs.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "An error occurred while creating a blog." });
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
    const data = await StLuciaBlogs.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog." });
  }
});

// ******************************
// ******* GRAND ANTIGUA ********
// ******************************
// Get all Blogs
app.get("/api/grandantiguablogs", async (req, res) => {
  try {
    const data = await GrandAntiguaBlogs.find({});
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

// Get blog by ID
app.get("/api/grandantiguablogs/:id", async (req, res) => {
  try {
    const data = await GrandAntiguaBlogs.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog." });
  }
});

// Create a blog
app.post("/api/grandantiguablogs", async (req, res) => {
  try {
    const data = await GrandAntiguaBlogs.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "An error occurred while creating a blog." });
  }
});

// Update a blog
app.put("/api/grandantiguablogs/:id", async (req, res) => {
  try {
    // send data through a body
    const blogId = req.params.id;
    const { title, image, date, description, blogArray } = req.body;

    const data = await GrandAntiguaBlogs.findByIdAndUpdate(blogId, {
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
app.delete("/api/grandantiguablogs/:id", async (req, res) => {
  try {
    const data = await GrandAntiguaBlogs.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog." });
  }
});

// ****************************************
// ************** LISTENER ****************
// ****************************************
app.get("/", (req, res) => {
  res.json("Hello World! This is your server!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});