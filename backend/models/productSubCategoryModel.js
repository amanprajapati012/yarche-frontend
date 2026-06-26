// models/CourseCategory.js
const mongoose = require("mongoose");

const productSubCategorySchema = new mongoose.Schema(
  {
    sub_category: {
      type: String,
      required: true,
      unique: true, // prevent duplicate subcategories
      trim: true,   // remove extra spaces
    },
    // description: {
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
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory", // replace with your actual category model name
      required: true,         // ensure every subcategory belongs to a category
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSubCategory", productSubCategorySchema);
