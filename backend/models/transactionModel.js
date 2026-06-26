const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
{
  // 👤 USER (jis ko income milegi)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userId: {
    type: String // readable id (SJDW2025xxxx)
  },

  // 🔥 TRANSACTION TYPE (MLM FULL SUPPORT)
  type: {
    type: String,
    enum: [
      // 🟢 CORE
      "subscription",        // Prime buy
      "cashback",            // 8% repurchase

      // 🔵 MLM INCOME
      "level_income",        // 20 level
      "performance_bonus",   // 5%
      "global_club",         // auto pool
      "salary_income",       // monthly salary
      "reward_income",       // watch, car
      "franchise_income",    // geo income
      "founder_bonus",       // 5%
      "bonanza_income",      // offer
      "royalty_income",      // rank based

      // 🟡 EXISTING (KEEP)
      "level_income",
      "rank_reward",
      "autopool_reward",
      "franchise_buy",
      "ccf_reward",

      // 💰 WALLET
      "wallet_credit",
      "wallet_debit",

      // 🏦 WITHDRAW
      "Withdraw",
      "Withdraw_Rejected",

      // ⚙️ SYSTEM
      "admin_adjustment",
      "Online",
      "Admin",
    ],
    required: true
  },

  // 💰 AMOUNT
  amount: {
    type: Number,
    required: true
  },

  // 💳 WALLET TYPE
  walletType: {
    type: String,
    enum: [
      "mainWallet",        // withdraw
      "earningWallet",     // MLM income
      "repurchaseWallet",  // 8% cashback
      "autopoolWallet"
    ],
    default: "earningWallet"
  },

  // 👇 INCOME SOURCE (kis se aaya)
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fromUserId: {
    type: String
  },

  // 🔢 LEVEL (MLM ke liye)
  level: {
    type: Number // 1–20
  },

  // 🔁 POOL (autopool / global club)
  pool: {
    type: Number
  },

  // 📝 DESCRIPTION
  description: {
    type: String
  },

  // 📊 STATUS
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "success"
  },

  // 🔑 UNIQUE TRANSACTION ID
  transactionId: {
    type: String
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Transaction", transactionSchema);