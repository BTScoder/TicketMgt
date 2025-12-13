import dotenv from "dotenv";
dotenv.config(); // Allows access to the env file
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";
import cookieParser from "cookie-parser";
const app = express();

// Connect to Database
connectDB();

//middlewares
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
); // Lets frontend(5173) get access to the server along with cookies
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Allows you to parse json from the frontend
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Ticket Management API is running!" });
});
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
