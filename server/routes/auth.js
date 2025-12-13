import express from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import authToken from "../middleware/authToken.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  // Create the token
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_TOKEN,
    { expiresIn: "1d" }
  );

  // Store token in cookie
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "lax",
  //   path: "/", // Add this - makes cookie available everywhere
  //   domain: "localhost", // Add this explicitly
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day
  // });

  // console.log("Cookie set:", token);
  res.json({ message: "Login successful", user, token });
});

// Get single user
router.get("/me", authToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
