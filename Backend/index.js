

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import UserRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// --------------------------------------------------
// CORS Setup
// --------------------------------------------------
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("❌ Not Allowed By CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// --------------------------------------------------
// Middleware
// --------------------------------------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// Default Route
// --------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).send("🚀 Server is running successfully!👋👋👋👋");
});

app.use("/user/api",UserRoute)

// --------------------------------------------------
// Start Server Function
// --------------------------------------------------
const startServer = async () => {
  try {
    // Database connection
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`✅ Server running at: http://localhost:${PORT}`);
      
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1); // Exit process (important for production)
  }
};

// Start server
startServer();
