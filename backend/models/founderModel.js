const mongoose =  require("mongoose");
const founderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: Boolean, default: true },
  price: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model("Founder", founderSchema);