const mongoose =  require("mongoose");

const franchiseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    franchiseType: {
      type: String,
      enum: ["state", "district", "block"],
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      default: "",
    },

    block: {
      type: String,
      default: "",
    },

    userRef: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Franchise", franchiseSchema);