// models/CourseCategory.js
const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true, // prevent duplicate categories
      trim: true,   // remove extra spaces
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
    // keyFeature: {
    //   type: String,
    //   required: true,
    // },
    // keyword: {
    //   type: String, 
    // },
    images: {
      type: [String], // Stores multiple image URLs or paths
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
