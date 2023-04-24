const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostDetail,
} = require("../controllers/postController");
const {
  addComment,
  getAllComments,
} = require("../controllers/commentController");

// Create a new post
router.post("/", createPost);

// Create a new comment in a post
router.post("/:id/comment", addComment);

// Get all posts
router.get("/", getAllPosts);

// Get a post with all its comments
router.get("/:id", getPostDetail);

// Get all comments by post ID
router.get("/:id/comments", getAllComments);

module.exports = router;
