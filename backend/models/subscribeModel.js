const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // 🔥 SAME AS USERID
  subscriptionId: {
    type: String
  },

  name: String,
  email: String,
  phone: String,

  amount: {
    type: Number,
    default: 2000
  },

  gst: {
    type: Number,
    default: 360
  },

  totalAmount: {
    type: Number,
    default: 2360
  },

  // ⭐ PRIME VALIDITY
  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date
  },

  // 🎟️ COUPON = USERID
  couponCode: {
    type: String
  },

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Subscribe", subscribeSchema);