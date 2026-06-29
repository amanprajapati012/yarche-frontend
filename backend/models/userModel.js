const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

   
  },
  {
    timestamps: true,
  }
);

/* ================= PASSWORD ENCRYPT ================= */

userSchema.pre("save", function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = CryptoJS.AES.encrypt(
      this.password,
      process.env.SECRET_KEY
    ).toString();

    next();
  } catch (err) {
    next(err);
  }
});

/* ================= PASSWORD MATCH ================= */

userSchema.methods.comparePassword = function (
  plainPassword
) {
  try {
    const bytes = CryptoJS.AES.decrypt(
      this.password,
      process.env.SECRET_KEY
    );

    const decryptedPassword = bytes.toString(
      CryptoJS.enc.Utf8
    );

    return decryptedPassword === plainPassword;
  } catch (err) {
    return false;
  }
};

/* ================= JWT TOKEN ================= */

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      mobile: this.mobile,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

/* ================= GEO INDEX ================= */

userSchema.index({
  "address.location": "2dsphere",
});

module.exports = mongoose.model(
  "User",
  userSchema
);