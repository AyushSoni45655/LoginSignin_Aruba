import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
      // On success
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully👋👋");
    });

    // On error
    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err);
    });
    // MongoDB Connection
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Aruba",
    });

  

  } catch (error) {
    console.log("❌ Database connection failed:", error);
  }
};

export default connectDB;
