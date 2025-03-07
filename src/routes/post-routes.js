import { Router } from "express";
import Post from "../models/post_model.js";
import logger from "../utils/logger.js";

const router = Router();

// Create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    info("New post created");
    res.status(201).json(newPost);
  } catch (error) {
    _error("Error creating post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await find();
    info("Fetched all posts");
    res.status(200).json(posts);
  } catch (error) {
    _error("Error fetching posts: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await findById(req.params.id);
    if (!post) {
      warn("Post not found: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    info("Fetched post: " + req.params.id);
    res.status(200).json(post);
  } catch (error) {
    _error("Error fetching post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      warn("Post not found for update: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    info("Updated post: " + req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    _error("Error updating post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      warn("Post not found for deletion: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    info("Deleted post: " + req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    _error("Error deleting post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;