import { Router } from "express";
import Post from "../models/post_model.js";
import logger from "../utils/logger.js";

const router = Router();

// Create a post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    logger.info("New post created");
    res.status(201).json(newPost);
  } catch (error) {
    logger.error("Error creating post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await find();
    logger.info("Fetched all posts");
    res.status(200).json(posts);
  } catch (error) {
    logger.error("Error fetching posts: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  try {
   
    const post = await Post.findById(req.params.id);
    logger.debug("Debugging post: " + req.params.id);
    if (!post) {
      logger.warn("Post not found: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    logger.info("Fetched post: " + req.params.id);
    res.status(200).json(post);
  } catch (error) {
    logger.error("error fetching post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      logger.warn("Post not found for update: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    logger.info("Updated post: " + req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    logger.error("Error updating post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      logger.warn("Post not found for deletion: " + req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    logger.info("Deleted post: " + req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    logger.error("Error deleting post: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;