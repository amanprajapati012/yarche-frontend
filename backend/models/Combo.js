const mongoose = require("mongoose");

const comboProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// ==========================
// Image Sub-Schema (multiple images ke liye)
// ==========================

const comboImageSchema = new mongoose.Schema(
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
  {
    _id: false,
  }
);

const comboSchema = new mongoose.Schema(
  {
    comboSku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // ==========================
    // Multiple Images (pehle single "image" object tha)
    // ==========================

    images: {
      type: [comboImageSchema],
      validate: {
        validator: function (value) {
          return value.length >= 1;
        },
        message: "At least one combo image is required.",
      },
    },

    products: {
      type: [comboProductSchema],
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: "Combo must contain at least 2 products.",
      },
    },

    // Original Price (Auto Calculated)
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Offer Price
    discountedPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Landing Page Special Price
    landingPrice: {
      type: Number,
      default: 0,
      min: 0,
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

module.exports = mongoose.model("Combo", comboSchema);
