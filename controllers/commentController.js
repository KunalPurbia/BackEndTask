const Comment = require("../models/comment");
const Post = require("../models/post");

const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  const comment = new Comment({
    comment: req.body.comment,
    post: post._id,
  });

  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  res.send(comment);
};

const getAllComments = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");
  res.send(post.comments);
};

module.exports = { addComment, getAllComments };
