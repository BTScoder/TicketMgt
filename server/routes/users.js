import express from "express";
import User from "../model/User.js";
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  console.log(req.body);
  const { username, email } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }
  try {
    const user = await User.create(req.body);
    return res.json({ message: "User created successfully", user: user });
  } catch (err) {
    return res.status(500).json({ error: "Error saving user" });
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

export default router;
