const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      default: 0,
    },

    landingPrice: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    description: {
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

    // NEW
    useProductImages: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    productSku: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
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

    full_description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    sub_category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      default: 0,
    },

    landingPrice: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 0,
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

    variants: {
      type: [variantSchema],
      default: [],
    },

     tags: {
      type: [String],
      enum: [
        "featured",
        "best-seller",
        "new-arrival",
        "top-product",
        "trending",
        "hot-deal",
        "recommended",
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);