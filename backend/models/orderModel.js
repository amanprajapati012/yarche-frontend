const mongoose = require("mongoose");

// ==================== ORDER ITEM SCHEMA ====================
const orderItemSchema = new mongoose.Schema({
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },

  product_name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  price: { type: Number, required: true },             // base price
  discountedPrice: { type: Number, required: true },   // discounted value
  itemTotalPrice: { type: Number, required: true },    // qty * discountedPrice
  image: { type: String },

  quantity: { type: Number, required: true }
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
    
    paymentMode : {
    type : String,
    required: true,
  },

    deliveryStatus: {
      type: String,
      default: "Pending",
    },

    address: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      email: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: Number },
      country: { type: String, default: "India" }
    },

    // Payment fields
    transactionNo: {
      type: String,
      default: null,
    },
  paymentStatus: {
  type: String,
  enum: ["pending", "success", "failed"], // ✅ add all states
  default: "pending",
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);