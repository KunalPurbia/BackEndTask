const Post = require("../models/post");

const createPost = async (req, res) => {
  const post = new Post({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    published_on: req.body.published_on,
  });

  await post.save();

  res.send(post);
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("comments");
  res.send(posts);
};

const getPostDetail = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
};

module.exports = { createPost, getAllPosts, getPostDetail };
