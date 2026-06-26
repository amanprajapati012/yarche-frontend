// models/AdminUser.js
require("dotenv").config();
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const adminUserSchema = new mongoose.Schema(
  {
    adminUser: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password before saving
adminUserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = CryptoJS.AES.encrypt(this.password, process.env.ADMIN_SECRET_KEY).toString();
  }
  next();
});

// Compare password during login
adminUserSchema.methods.checkPassword = function (plainPassword) {
  const bytes = CryptoJS.AES.decrypt(this.password, process.env.ADMIN_SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword === plainPassword;
};

// 🔹 Generate JWT Token
adminUserSchema.methods.generateAuthToken = function (expiresIn = "1h") {
  const payload = {
    id: this._id,
    adminUser: this.adminUser
  };

  return jwt.sign(payload, process.env.ADMIN_JWT_SECRET_KEY, { expiresIn });
};

module.exports = mongoose.model("AdminUser", adminUserSchema);
