const express = require("express");
const bcrypt = require("bcryptjs"); //password hashing
const jwt = require("jsonwebtoken"); //.sign() method to create JWT tokens, .verify() method to verify JWT tokens
const User = require("../model/user");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();

  res.json({ msg: "User registered" });
});

// LOGIN using username and password
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  // JWT contains username with secret key = secret123
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
