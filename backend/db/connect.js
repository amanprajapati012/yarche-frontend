require("dotenv").config();
const mongoose = require("mongoose");

const db = async () => {
  await mongoose
    .connect(process.env.MONGOURI
    //   , 
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = db;
