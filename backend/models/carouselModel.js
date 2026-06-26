const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },

    caption: {
      type: String, // small top text (like "Oriental Collection")
      default: "",
    },

    images: {
      type: [String], // multiple images
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true, // show/hide control from admin
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carousel", carouselSchema);