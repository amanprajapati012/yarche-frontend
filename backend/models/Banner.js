const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    topText: {
      type: String,
      default: "",
      trim: true,
    },

    leftOffer: {
      type: String,
      default: "",
      trim: true,
    },

    leftText: {
      type: String,
      default: "",
      trim: true,
    },

    leftCode: {
      type: String,
      default: "",
      trim: true,
    },

    rightOffer: {
      type: String,
      default: "",
      trim: true,
    },

    rightText: {
      type: String,
      default: "",
      trim: true,
    },

    rightCode: {
      type: String,
      default: "",
      trim: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    buttonText: {
      type: String,
      default: "Shop Now",
      trim: true,
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);