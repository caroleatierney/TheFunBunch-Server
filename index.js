// ******************************
// ******* DEPENDENCIES *********
// ******************************
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const StLuciaBlogs = require("./models/StLuciaBlogs");
const GrandAntiguaBlogs = require("./models/GrandAntiguaBlogs");
const mongoose = require("mongoose");

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

app.get("/api/stluciablogs", async (req, res) => {
  try {
    const data = await StLuciaBlogs.find({});
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching St. Lucia blogs:", error);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
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

// Get blog array by postId
app.get("/api/stluciablogs/:id/blogArray", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }

    const data = await StLuciaBlogs.findById(id, 'blogArray');

    if (!data) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(data.blogArray);
  } catch (error) {
    console.error("Error fetching blogArray:", error);
    res.status(500).json({ error: "An error occurred while fetching the blogArray." });
  }
});

// Get blog array by postId and specific array item
app.get("/api/stluciablogs/:postId/blogArray/:itemId", async (req, res) => {
  try {
    const { postId, itemId } = req.params;

    // Check if the postId and itemId are valid ObjectIds
    if (
      !mongoose.isValidObjectId(postId) ||
      !mongoose.isValidObjectId(itemId)
    ) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const data = await StLuciaBlogs.findById(postId, "blogArray");

    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Find the specific item in the blogArray
    const item = data.blogArray.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ error: "Blog array item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching blogArray:", error);
    res.status(500).json({ error: "An error occurred while fetching the blogArray." });
  }
});

// Create a post
app.post("/api/stluciablogs", async (req, res) => {
  try {
    const data = await StLuciaBlogs.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "An error occurred while creating a blog." });
  }
});

// Update a post
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
    console.log("Data" + data)

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

// Delete a post by postId
app.delete("/api/stluciablogs/:postId", async (req, res) => {
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

// Delete a blog by blogId
app.delete("/api/stluciablogs/:postId/blogArray/:itemId", async (req, res) => {
  const { postId, itemId } = req.params;
  try {
    const result = await StLuciaBlogs.updateOne(
      { _id: postId },
      { $pull: { blogArray: { _id: itemId } } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Blog item not found or not deleted" });
    }
    
    res.status(200).json({ message: "Blog item deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while deleting the blog item",
        details: error.message,
      });
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

// Get post by ID
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

// Create a post
app.post("/api/grandantiguablogs", async (req, res) => {
  try {
    const data = await GrandAntiguaBlogs.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "An error occurred while creating a blog." });
  }
});

// Update a post
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

// Delete a post by ID
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