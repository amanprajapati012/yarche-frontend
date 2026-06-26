const mongoose =  require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    maxDiscountAmount: {
      type: Number,
      default: null, // only for percentage
    },

    userLimit: {
      type: Number,
      default: null, // only for percentage
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    usageLimit: {
      type: Number,
      default: null, // unlimited
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ---------------------------------------------
// Middleware → Deactivate expired coupons
// ---------------------------------------------
discountSchema.pre("save", function (next) {
  const now = new Date();
  if (this.endDate < now) {
    this.isActive = false;
  }
  next();
});

// ---------------------------------------------
// Method → Check if coupon is currently valid
// ---------------------------------------------
discountSchema.methods.isValid = function () {
  const now = new Date();

  if (!this.isActive) return false;
  if (now < this.startDate || now > this.endDate) return false;

  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return false;
  }

  return true;
};

module.exports =  mongoose.model("Discount", discountSchema);
