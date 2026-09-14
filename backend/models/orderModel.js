const mongoose = require("mongoose");

// =====================================================
// ORDER ITEM SCHEMA
// =====================================================

const orderItemSchema = new mongoose.Schema({
  // product OR combo
  type: {
    type: String,
    enum: ["product", "combo"],
    default: "product",
  },

  // ===================================================
  // NORMAL PRODUCT FIELDS
  // ===================================================

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null,
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

  // ===================================================
  // COMBO FIELDS
  // ===================================================

  combo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Combo",
    default: null,
  },

  comboSku: {
    type: String,
    default: "",
  },

  // Snapshot of products inside combo
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

      name: {
        type: String,
        default: "",
      },

      variant_title: {
        type: String,
        default: "",
      },

      // Quantity of this product inside ONE combo
      quantity: {
        type: Number,
        default: 1,
      },

      price: {
        type: Number,
        default: 0,
      },
    },
  ],

  // ===================================================
  // COMMON PRODUCT / COMBO FIELDS
  // ===================================================

  product_name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "",
  },

  subcategory: {
    type: String,
    default: "",
  },

  // Original price
  price: {
    type: Number,
    required: true,
  },

  // Actual selling price
  discountedPrice: {
    type: Number,
    required: true,
  },

  // discountedPrice * quantity
  itemTotalPrice: {
    type: Number,
    required: true,
  },

  // Product / Combo image snapshot
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

  // Ordered quantity
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// =====================================================
// ORDER SCHEMA
// =====================================================

const orderSchema = new mongoose.Schema(
  {
    // ===================================================
    // ORDER ITEMS
    // ===================================================

    items: {
      type: [orderItemSchema],
      required: true,
      default: [],
    },

    // ===================================================
    // USER
    // ===================================================

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===================================================
    // CUSTOMER DETAILS
    // ===================================================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: Number,
    },

    // ===================================================
    // ORDER TOTALS
    // ===================================================

    itemQuantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },

    couponCode: {
      type: String,
      default: "",
    },

    couponDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ===================================================
    // PAYMENT
    // ===================================================

    paymentMode: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    transactionNo: {
      type: String,
      default: null,
    },

    // ===================================================
    // DELIVERY STATUS
    // ===================================================

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

    // ===================================================
    // DELIVERY TIMELINE
    // ===================================================

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

    // ===================================================
    // TRACKING - GENERAL
    // ===================================================

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

    // ===================================================
    // ORDER ADDRESS SNAPSHOT
    // ===================================================

    address: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },

      fullName: {
        type: String,
        default: "",
      },

      mobile: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      addressLine: {
        type: String,
        default: "",
      },

      landmark: {
        type: String,
        default: "",
      },

      district: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },
    },

    // ===================================================
    // CANCEL / RTO / DELIVERY
    // ===================================================

    rtoReason: {
      type: String,
      default: "",
    },

    restockDone: {
      type: Boolean,
      default: false,
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

    // ===================================================
    // SHIPROCKET
    // ===================================================

    shiprocket: {
      // Shiprocket Order ID
      orderId: {
        type: String,
        default: "",
      },

      // Shiprocket Shipment ID
      shipmentId: {
        type: String,
        default: "",
      },

      // Channel Order ID
      channelOrderId: {
        type: String,
        default: "",
      },

      // Selected courier company ID
      courierCompanyId: {
        type: Number,
        default: null,
      },

      // Courier name
      courierName: {
        type: String,
        default: "",
      },

      // AWB number
      awbCode: {
        type: String,
        default: "",
      },

      // Tracking URL
      trackingUrl: {
        type: String,
        default: "",
      },

      // Label URL
      labelUrl: {
        type: String,
        default: "",
      },

      // Manifest URL
      manifestUrl: {
        type: String,
        default: "",
      },

      // Pickup generated / scheduled
      pickupScheduled: {
        type: Boolean,
        default: false,
      },

      pickupGeneratedAt: {
        type: Date,
        default: null,
      },

      // Label generated time
      labelGeneratedAt: {
        type: Date,
        default: null,
      },

      // Manifest generated time
      manifestGeneratedAt: {
        type: Date,
        default: null,
      },

      // Shipment time
      shippedAt: {
        type: Date,
        default: null,
      },

      // Shiprocket delivery time
      deliveredAt: {
        type: Date,
        default: null,
      },

      // Last tracking status received from Shiprocket
      lastTrackingStatus: {
        type: String,
        default: "",
      },

      // Last tracking update time
      lastTrackingUpdate: {
        type: Date,
        default: null,
      },
    },
  },

  {
    timestamps: true,
  }
);

// =====================================================
// EXPORT
// =====================================================

module.exports = mongoose.model("Order", orderSchema);