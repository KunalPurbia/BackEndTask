// post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  published_on: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
