require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGOURI;

    if (!uri) {
      throw new Error("❌ MONGOURI is not defined in environment variables");
    }

    console.log("🔗 Connecting MongoDB...");
    console.log("URI check:", uri.replace(/:\/\/.*@/, "://****:****@")); 
    // above line password hide karke log karega

    await mongoose.connect(uri);

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;