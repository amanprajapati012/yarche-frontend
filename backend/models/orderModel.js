const mongoose = require("mongoose");

// ==================== ORDER ITEM SCHEMA ====================
const orderItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["product", "combo"],
    default: "product",
  },

  // ================= NORMAL PRODUCT FIELDS =================
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null, // combo ke case me null hota hai, isliye required hataya
  },

  variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  variant_title: {
    type: String,
    default: "",
  },

  isVariant: {
    type: Boolean,
    default: false,
  },

  // ================= COMBO FIELDS =================
  combo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combo",
    default: null,
  },

  comboSku: {
    type: String,
    default: "",
  },

  // combo ke andar jo products the, unka snapshot
  // (order history dikhane ke liye aur baad me stock reduce karne ke liye zaroori)
  comboProducts: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      name: String,
      variant_title: {
        type: String,
        default: "",
      },
      quantity: Number, // ek combo unit ke andar kitni qty is product ki hai
      price: Number,
    },
  ],

  // ================= COMMON FIELDS =================
  product_name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "", // combo me category nahi hoti, isliye required hataya
  },

  subcategory: String,

  price: {
    type: Number,
    required: true,
  },

  discountedPrice: {
    type: Number,
    required: true,
  },

  itemTotalPrice: {
    type: Number,
    required: true,
  },

  image: {
    url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
  },

  quantity: {
    type: Number,
    required: true,
  },
});

// ==================== ORDER SCHEMA ====================
const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: { type: String, required: true },
    mobile: { type: Number },

    itemQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    shipping: { type: Number, default: 0 },

    couponCode: { type: String },
    couponDiscount: { type: Number, default: 0 },

    paymentMode: {
      type: String,
      required: true,
    },

    deliveryStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "RTO Initiated",
        "RTO In Transit",
        "RTO Delivered",
      ],
      default: "Pending",
    },

    deliveryTimeline: [
      {
        status: {
          type: String,
          required: true,
        },

        message: {
          type: String,
          required: true,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    trackingId: {
      type: String,
      default: "",
    },

    courierName: {
      type: String,
      default: "",
    },

    expectedDelivery: {
      type: Date,
      default: null,
    },

    address: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },

      fullName: String,

      mobile: String,

      email: String,

      addressLine: String,

      landmark: String,

      district: String,

      city: String,

      state: String,

      country: String,

      pincode: String,
    },

    rtoReason: {
      type: String,
      default: "",
    },

    restockDone: {
      type: Boolean,
      default: false,
    },

    // Payment fields
    transactionNo: {
      type: String,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    rtoCompletedAt: {
      type: Date,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"], // ✅ add all states
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);