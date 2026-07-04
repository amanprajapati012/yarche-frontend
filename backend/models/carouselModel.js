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
      type: String,
      default: "",
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carousel", carouselSchema);