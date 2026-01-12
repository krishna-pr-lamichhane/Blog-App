const express = require("express");
const Blog = require("../model/blog");
const User = require("../model/user");
const auth = require("../middleware/auth");

const router = express.Router();

// get all the blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("user", "username");
  res.json(blogs);
});

// for adding a blog post
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const user = await User.findOne({ username: req.user.username });

  const blog = new Blog({ title, content, user: user._id });
  await blog.save();

  res.json(blog);
});

// for editing existig blog post
router.put("/:id", auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user");

  if (blog.user.username !== req.user.username) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  blog.title = req.body.title;
  blog.content = req.body.content;
  await blog.save();

  res.json(blog);
});

// deleting blog posts
router.delete("/:id", auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user");

  if (blog.user.username !== req.user.username) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  await blog.deleteOne();
  res.json({ msg: "Blog deleted" });
});

module.exports = router;
