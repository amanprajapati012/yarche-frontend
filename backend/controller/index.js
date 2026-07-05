const ContactUs = require("../models/contactUsModel");
const Product = require("../models/productModel");
const nodemailer = require("nodemailer");
const AdminUser = require("../models/adminUserModel");
const ProductCategory = require("../models/productCategoryModel");
const CryptoJS = require("crypto-js");
const ProductSubCategory = require("../models/productSubCategoryModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Discount = require("../models/discountModel");
const Carousel = require("../models/carouselModel");
const Reel = require("../models/reelModels");
const Transaction = require("../models/transactionModel");
const Otp = require("../models/otpModel");
const Founder = require("../models/founderModel");
const Franchise = require("../models/franchiseModel");
const { v4: uuidv4 } = require("uuid");
const Address = require("../models/addressModel");
const mongoose = require("mongoose");
const { getIO } = require("../socket/socket");
const Notification = require("../models/Notification");
const Collection = require("../models/CollectionModel");
const Razorpay = require("razorpay");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const Subscribe = require("../models/subscribeModel");
const sendMail = require("./sendMailController");
require("dotenv").config();

// Home Controller
const home = async (req, res) => {
  res.send("Hello from Express server!");
};

// About Controller
const about = async (req, res) => {
  res.send("This is the about page.");
};

// Admin Register Controller
const adminRegister = async (req, res) => {
  try {
    const { adminUser, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ adminUser });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin user already exists", response: "failed" });
    }

    // Create new admin
    const newAdmin = new AdminUser({ adminUser, password });
    await newAdmin.save();

    // Generate token
    const adminToken = newAdmin.generateAuthToken();

    res.status(201).json({
      message: "Admin registered successfully",
      response: "success",
      adminUser: newAdmin.adminUser,
      adminToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", response: "failed", error });
  }
};

// Admin Login Controller
const adminLogin = async (req, res) => {
  try {
    const { adminUser, password } = req.body;
    // Check if admin exists
    const admin = await AdminUser.findOne({ adminUser });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Invalid admin credentials", response: "failed" });
    }

    // Check password
    const isPasswordValid = admin.checkPassword(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid admin credentials", response: "failed" });
    }

    // Generate token
    const adminToken = admin.generateAuthToken();

    res.status(200).json({
      message: "Admin logged in successfully",
      response: "success",
      admin: admin.adminUser,
      adminToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", response: "failed", error });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existing) {
      return res.status(400).json({
        response: "failed",
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
    });

    // notification (same as before)
    const notification = await Notification.create({
      title: "New Customer Registered",
      message: `${user.name} has created a new account`,
      type: "user",
      link: "/admin/customers",
      meta: {
        userId: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });

    try {
      const io = getIO();
      io.emit("new-notification", notification);
    } catch (socketError) {
      console.log(socketError.message);
    }

    const token = user.generateToken();

    res.status(201).json({
      response: "success",
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================ LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    // validation
    if ((!email && !mobile) || !password) {
      return res.status(400).json({
        response: "failed",
        message: "Email/mobile and password required",
      });
    }

    // find user
    const user = await User.findOne({
      $or: [
        email ? { email: email.toLowerCase().trim() } : null,
        mobile ? { mobile: mobile.trim() } : null,
      ].filter(Boolean),
    });

    if (!user) {
      return res.status(404).json({
        response: "failed",
        message: "User not found",
      });
    }

    // check password
    const isMatch = user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        response: "failed",
        message: "Wrong password",
      });
    }

    // generate token
    const token = user.generateToken();

    return res.status(200).json({
      response: "success",
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        createdAt: user.createdAt,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    console.log("============== ADD ADDRESS ==============");
    console.log("USER :", req.user);
    console.log("BODY :", req.body);

    const userId = req.user.id;

    const {
      type,
      name,
      mobile,
      email,
      addressLine,
      landmark,
      city,
      district,
      state,
      country,
      pincode,
      latitude,
      longitude,
    } = req.body;

    // ================= VALIDATION =================

    if (
      !name ||
      !mobile ||
      !email ||
      !addressLine ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        response: "failed",
        message: "Please fill all required fields",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        response: "failed",
        message: "Invalid email address",
      });
    }

    const address = await Address.create({
      user: userId,

      type,
      name,
      mobile,
      email,

      addressLine,
      landmark,
      city,
      district,
      state,
      country,
      pincode,

      location: {
        type: "Point",
        coordinates: [
          Number(longitude) || 0,
          Number(latitude) || 0,
        ],
      },
    });

    return res.status(201).json({
      response: "success",
      message: "Address added successfully",
      data: address,
    });

  } catch (err) {
    console.log("============== ERROR ==============");
    console.log(err);
    console.log(err.message);
    console.log(err.stack);

    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

/* ================= GET USER ADDRESSES ================= */
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ user: userId });

    return res.status(200).json({
      response: "success",
      data: addresses,
    });
  } catch (err) {
    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};


const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await Address.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        response: "failed",
        message: "Address not found",
      });
    }

    Object.assign(address, req.body);

    if (req.body.latitude && req.body.longitude) {
      address.location = {
        type: "Point",
        coordinates: [
          req.body.longitude,
          req.body.latitude,
        ],
      };
    }

    await address.save();

    return res.status(200).json({
      response: "success",
      message: "Address updated successfully",
      data: address,
    });

  } catch (err) {
    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

/* ================= DELETE ADDRESS ================= */
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.findByIdAndDelete(id);

    return res.status(200).json({
      response: "success",
      message: "Address deleted",
    });
  } catch (err) {
    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

/* ================= SET DEFAULT ADDRESS ================= */
const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );

    const updated = await Address.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    );

    return res.status(200).json({
      response: "success",
      message: "Default address updated",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    const user = await User.findById(req.user.id);
    console.log("TOKEN USER:", req.user);
console.log("BODY:", req.body);
    console.log("DECODED USER =>", req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;
    user.mobile = mobile;

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User by ID (for Profile)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid User ID",
        response: "failed",
      });
    }

    // Find user by ID
    const user = await User.findById(id)
      .select("-password")
      .populate("referredBy", "name mobile userId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: "failed",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      response: "success",
      data: user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return res.status(500).json({
      message: "Server error",
      response: "failed",
      error: error.message,
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // We check if user exists first
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with this email" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    // NodeMailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // 587 (TLS) or 465 (SSL)
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SJDW Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. Valid for 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const validOtp = await Otp.findOne({ email, otp });

  if (!validOtp) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ success: true, message: "OTP verified" });
};

// 3. Update Password
const changePassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    // Check OTP one last time for security
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp)
      return res
        .status(400)
        .json({ message: "Session expired. Please request OTP again." });

    const user = await User.findOne({ email });

    // IMPORTANT: Just set the plain password.
    // Your User Model's pre("save") hook will automatically
    // encrypt it using CryptoJS.AES before it hits the DB.
    user.password = password;
    await user.save();

    await Otp.deleteMany({ email });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Product
const getProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by latest

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No Product found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      response: "success",
      products: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch courses",
      response: "failed",
      error: err.message,
    });
  }
};

// Get single Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      response: "success",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch Product",
      response: "failed",
      error: err.message,
    });
  }
};

const getProductByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({
        response: "failed",
        message: "Category name is required",
      });
    }

    // Format categoryName: "home-appliances" -> "Home Appliances"
    const decodedSlug = decodeURIComponent(categoryName.trim().toLowerCase());
    const formattedName = decodedSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Check if the category exists
    const category = await ProductCategory.findOne({
      category: { $regex: new RegExp(`^${formattedName}$`, "i") },
    });

    if (!category) {
      return res.status(404).json({
        response: "failed",
        message: `Category '${formattedName}' not found`,
      });
    }

    // Fetch products by category name
    const products = await Product.find({ category: category.category });

    if (products.length === 0) {
      return res.status(200).json({
        response: "success",
        message: `No products found under category '${formattedName}'`,
        products: [],
      });
    }

    res.status(200).json({
      response: "success",
      category: category.category,
      productCount: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category name:", error);
    res.status(500).json({
      response: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

const getProductbyProductName = async (req, res) => {
  try {
    const { product_name } = req.params;

    if (!product_name) {
      return res.status(400).json({
        message: "Product name is required",
        response: "failed",
      });
    }

    // URL slug -> normal name
    const normalizedName = decodeURIComponent(product_name)
      .trim()
      .replace(/-/g, " ")
      .replace(/\s+/g, " ");

    // regex safe
    const escapedName = normalizedName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const product = await Product.findOne({
      name: {
        $regex: `^${escapedName}$`,
        $options: "i",
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        response: "failed",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      response: "success",
      data: product,
    });
  } catch (err) {
    console.error("Get Product Error:", err);

    return res.status(500).json({
      message: "Server error",
      response: "failed",
      error: err.message,
    });
  }
};

// Add Contact Us Controllers
const addContactUs = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // create a new entry
    const newContact = await ContactUs.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      response: "success",
      message: "Contact form submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "failed",
      message: "Server Error",
      error: error.message,
    });
  }
};

// ➤ Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ createdAt: -1 });

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        message: "No categories found",
        response: "failed",
        data: [],
      });
    }

    res.status(200).json({
      message: "Categories retrieved successfully",
      response: "success",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Get Single Category
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. validate ObjectId first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category id",
      });
    }

    const category = await ProductCategory.findById(id);

    // 2. handle not found
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ➤ Get Category by Name
const getCategoryByName = async (req, res) => {
  try {
    const { category } = req.params;

    // Validate incoming category
    if (!category || category.trim() === "") {
      return res.status(400).json({
        response: "error",
        message: "Category name is required",
      });
    }

    // Decode and normalize category slug
    const decodedCategory = decodeURIComponent(category.trim().toLowerCase());
    const formattedCategory = decodedCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Check if category exists in database
    const matchedCategory = await ProductCategory.findOne({
      category: { $regex: new RegExp(`^${formattedCategory}$`, "i") },
    });

    if (!matchedCategory) {
      return res.status(404).json({
        response: "failed",
        message: `Category '${formattedCategory}' not found`,
      });
    }

    return res.status(200).json({
      response: "success",
      message: "Category found",
      category: matchedCategory,
    });
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({
      response: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

// ➤ Get All Sub Categories
const getSubCategories = async (req, res) => {
  try {
    const sub_categories = await ProductSubCategory.find()
      .populate("category_id", "category") // 🔥 MAIN FIX
      .sort({ createdAt: -1 });

    if (!sub_categories || sub_categories.length === 0) {
      return res.status(404).json({
        message: "No sub categories found",
        response: "failed",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Sub categories retrieved successfully",
      response: "success",
      data: sub_categories,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Get Single sub_category
const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const sub_category = await ProductSubCategory.findById(id);

    if (!sub_category) {
      return res.status(404).json({
        message: "Category not found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      response: "success",
      data: sub_category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

const getSubCategoryByName = async (req, res) => {
  try {
    const { sub_category } = req.params;

    if (!sub_category || sub_category.trim() === "") {
      return res.status(400).json({
        response: "error",
        message: "Subcategory name is required",
      });
    }

    // Decode and format subcategory slug (e.g., "smart-phones" -> "Smart Phones")
    const decodedSlug = decodeURIComponent(sub_category.trim().toLowerCase());
    const words = decodedSlug.split("-");
    const formattedSubCategory = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const foundSubCategory = await ProductSubCategory.findOne({
      sub_category: { $regex: new RegExp(`^${formattedSubCategory}$`, "i") }, // case-insensitive exact match
    }).populate("category_id", "category images"); // include linked category info

    if (!foundSubCategory) {
      return res.status(404).json({
        response: "error",
        message: "Subcategory not found",
      });
    }

    const products = await Product.find({
      sub_category: foundSubCategory.sub_category,
    });
    if (!products) {
      return res.status(404).json({
        response: "error",
        message: "Product not found Subcategory",
      });
    }

    res.status(200).json({
      response: "success",
      data: foundSubCategory,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching subcategory by name:", error);
    res.status(500).json({
      response: "error",
      message: "Server error",
    });
  }
};

// Controller: Get Subcategories by Category Name
const getSubcategoryByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.params;

    // Validate input
    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({
        response: "failed",
        message: "Category name is required",
      });
    }

    // Decode and format the category slug: "mens-wear" -> "Mens Wear"
    const decodedSlug = decodeURIComponent(categoryName.trim().toLowerCase());
    const formattedCategory = decodedSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Look up the category
    const category = await ProductCategory.findOne({
      category: { $regex: new RegExp(`^${formattedCategory}$`, "i") },
    });

    if (!category) {
      return res.status(404).json({
        response: "failed",
        message: `Category '${formattedCategory}' not found`,
      });
    }

    const subCategories = await ProductSubCategory.find({
      category_id: category._id,
    });

    // Return subcategories
    return res.status(200).json({
      response: "success",
      subCategory: subCategories,
      category: category,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      response: "failed",
      message: "Server error. Please try again later.",
    });
  }
};

//
// ---------------- CREATE ORDER ----------------
//

// ==================== CREATE ORDER ====================
const createOrder = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      user_id,
      items,
      shipping = 0,
      couponCode,
      discount = 0,
      paymentMode,
      addressId,
      email,
    } = req.body;

    // ================= VALIDATION =================

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
        response: "failed",
      });
    }

    if (!fullName || !mobile) {
      return res.status(400).json({
        message: "Full name & mobile required",
        response: "failed",
      });
    }

    if (!addressId) {
      return res.status(400).json({
        message: "Address is required",
        response: "failed",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Items are required",
        response: "failed",
      });
    }

    // ================= GET ADDRESS =================

    const selectedAddress = await Address.findOne({
      _id: addressId,
      user: user_id,
    });

    if (!selectedAddress) {
      return res.status(404).json({
        message: "Address not found",
        response: "failed",
      });
    }

    // ================= BUILD ITEMS =================

    let formattedItems = [];
    let totalPrice = 0;
    let itemQuantity = 0;

    for (const item of items) {
      const product = await Product.findById(item.product_id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product_id}`,
          response: "failed",
        });
      }
      // ================= GET SELECTED VARIANT =================

let selectedVariant = null;

if (item.variant_id) {
  selectedVariant = product.variants.id(item.variant_id);

  if (!selectedVariant) {
    return res.status(404).json({
      message: "Selected variant not found",
      response: "failed",
    });
  }
}

    // ================= CHECK STOCK =================

if (selectedVariant) {
  if (item.quantity > selectedVariant.quantity) {
    return res.status(400).json({
      message: `Only ${selectedVariant.quantity} items available`,
      response: "failed",
    });
  }
} else {
  if (item.quantity > product.quantity) {
    return res.status(400).json({
      message: `Only ${product.quantity} items available`,
      response: "failed",
    });
  }
}

      // ================= PRICE =================

const price = selectedVariant
  ? selectedVariant.price
  : product.price;

const discounted = selectedVariant
  ? (selectedVariant.discountedPrice || selectedVariant.price)
  : (product.discountedPrice || product.price);

      const itemTotal = discounted * item.quantity;

      formattedItems.push({
  product_id: product._id,
  variant_id: selectedVariant?._id || null,

variant_title: selectedVariant?.title || "",

isVariant: !!selectedVariant,
  product_name: product.name,
  category: product.category,
  subcategory: product.sub_category, // agar schema me sub_category hai
 price: price,
  discountedPrice: discounted,
  itemTotalPrice: itemTotal,

 image:
  selectedVariant &&
  !selectedVariant.useProductImages &&
  selectedVariant.images?.length
    ? {
        url: selectedVariant.images[0].url,
        public_id: selectedVariant.images[0].public_id,
      }
    : {
        url: product.images?.[0]?.url || "",
        public_id: product.images?.[0]?.public_id || "",
      },

  quantity: item.quantity,
});

      totalPrice += itemTotal;
      itemQuantity += item.quantity;
    }

    const finalTotal = totalPrice + shipping - discount;

    // ================= DELIVERY DETAILS =================

const expectedDelivery = new Date();
expectedDelivery.setDate(expectedDelivery.getDate() + 5); // 5 days delivery

    // ================= ORDER ADDRESS =================

    const orderAddress = {
      addressId: selectedAddress._id,

      fullName: selectedAddress.name,

      mobile: selectedAddress.mobile,

      email: email || "",

      addressLine: selectedAddress.addressLine,

      landmark: selectedAddress.landmark,

      district: selectedAddress.district,

      city: selectedAddress.city,

      state: selectedAddress.state,

      country: selectedAddress.country,

      pincode: selectedAddress.pincode,
    };

    // ================= ONLINE =================

    if (paymentMode === "ONLINE") {
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(finalTotal * 100),
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
      });

     const newOrder = await Order.create({
  fullName,
  mobile,
  user_id,

  items: formattedItems,

  totalPrice: finalTotal,

  itemQuantity,

  shipping,

  couponCode,

  couponDiscount: discount,

  paymentMode,

  address: orderAddress,

  paymentStatus: "pending",

  razorpayOrderId: razorpayOrder.id,

  deliveryStatus: "Pending",

  expectedDelivery,

  deliveryTimeline: [
    {
      status: "Pending",
      message: "Order placed successfully.",
    },
  ],
});

      return res.status(200).json({
        message: "Razorpay order created",
        response: "success",
        razorpayOrder,
        order: newOrder,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    // ================= COD =================

   const newOrder = await Order.create({
  fullName,
  mobile,
  user_id,

  items: formattedItems,

  totalPrice: finalTotal,

  itemQuantity,

  shipping,

  couponCode,

  couponDiscount: discount,

  paymentMode,

  address: orderAddress,

  paymentStatus: "pending",

  deliveryStatus: "Pending",

  expectedDelivery,

  deliveryTimeline: [
    {
      status: "Pending",
      message: "Order placed successfully.",
    },
  ],
});

    return res.status(201).json({
      message: "Order created successfully",
      response: "success",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
      response: "failed",
    });
  }
};

//
// ---------------- GET ALL ORDERS ----------------
//
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Data Found",
      response: "success",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server Error", response: "failed" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        response: "failed",
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ user_id: userId })
      .sort({ createdAt: -1 }) // latest first
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        response: "failed",
        message: "No orders found for this user",
      });
    }

    return res.status(200).json({
      response: "success",
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return res.status(500).json({
      response: "failed",
      message: "Internal Server Error",
    });
  }
};

// Apply Discount
const applyDiscount = async (req, res) => {
  try {
    const { code, totalAmount, userId } = req.body;

    if (!code || totalAmount === undefined) {
      return res.status(400).json({
        message: "Code and totalAmount are required",
        response: "failed",
      });
    }

    const codeLimit = await Order.find({ user_id: userId, couponCode: code });

    const usedCodeCount = codeLimit.length;

    const discount = await Discount.findOne({ code: code.toUpperCase() });

    if (usedCodeCount >= discount?.userLimit) {
      return res.status(400).json({
        message: `You have already used this coupon ${usedCodeCount} times.`,
        response: "failed",
      });
    }

    // 1️⃣ Check discount availability + validity
    if (!discount || !discount.isValid()) {
      return res.status(400).json({
        message: "Invalid or expired coupon",
        response: "failed",
      });
    }

    // 2️⃣ Check minimum order amount
    if (totalAmount < discount.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount should be ₹${discount.minOrderAmount}`,
        response: "failed",
      });
    }

    let finalAmount = totalAmount;
    let discountAmount = 0;

    // 3️⃣ Apply percentage discount
    if (discount.type === "percentage") {
      discountAmount = (totalAmount * discount.value) / 100;

      // Apply max discount cap if exists
      if (discount.maxDiscountAmount && discount.maxDiscountAmount > 0) {
        discountAmount = Math.min(discountAmount, discount.maxDiscountAmount);
      }

      finalAmount = totalAmount - discountAmount;
    }

    // 4️⃣ Apply flat discount
    else if (discount.type === "flat") {
      discountAmount = discount.value;
      finalAmount = totalAmount - discountAmount;
    }

    // Prevent negative total
    if (finalAmount < 0) finalAmount = 0;

    // 5️⃣ Apply usage count
    // discount.usedCount += 1;
    // await discount.save();

    return res.json({
      message: "Coupon Applied",
      response: "success",
      originalTotal: totalAmount,
      finalTotal: finalAmount,
      discountApplied: discountAmount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      response: "failed",
      error: error.message,
    });
  }
};

//
// ---------------- UPDATE PAYMENT STATUS ONLY ----------------
//

// const updatePaymentStatus = async (req, res) => {
//   try {
//     const { id, transactionNo } = req.body;

//     if (!transactionNo) {
//       return res.status(400).json({
//         message: "transactionNo is required",
//         response: "failed",
//       });
//     }

//     // ------------------------------------------------
//     // 1. Get order first (to check old payment status)
//     // ------------------------------------------------
//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         message: "Order not found",
//         response: "failed",
//       });
//     }

//     // If coupon used, increment its usedCount
//     const usedCoupon = order.couponCode;
//     const newCoupon = await Discount.findOne({ code: usedCoupon });

//     if (newCoupon) {
//       // 5️⃣ Apply usage count
//       newCoupon.usedCount += 1;
//       await newCoupon.save();
//     }

//     // ------------------------------------------------
//     // 2. Prevent double stock reduction
//     // ------------------------------------------------
//     if (order.paymentStatus === "Success") {
//       return res.status(400).json({
//         message: "Payment already completed, stock already updated",
//         response: "failed",
//       });
//     }

//     // ------------------------------------------------
//     // 3. Reduce stock: product.package_size.stock -= order.items.quantity
//     // ------------------------------------------------
//     for (const item of order.items) {
//       await Product.findOneAndUpdate(
//         {
//           _id: item.product_id,
//           "package_size.package": item.selectedPackage,
//         },
//         {
//           $inc: { "package_size.$.quantity": -item.quantity },
//         },
//       );
//     }

//     // ------------------------------------------------
//     // 4. Update payment status
//     // ------------------------------------------------
//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       {
//         paymentStatus: "Success",
//         transactionNo: transactionNo,
//       },
//       { new: true },
//     );

//     const subject = `${order.fullName} Order ${order.totalPrice} Order Confirmed – #${order._id}`;

//     const orderText = `<h1>Hello ${order.fullName} </h1>
//                       <p?Thank you for your order! 🎉</p>
//                       <p>We’re happy to let you know that your COD order has been successfully confirmed.</p>
//                       <ul>
//                       <li>🧾 Order Number: #${order._id}</li>
//                       <li>📅 Order Date: ${order.createdAt.toLocaleString()}</li>
//                       <li>💳 Payment Method: ${order.paymentMode}</li>
//                       <li>💰 Total Amount: ₹${order.totalPrice}</li>
//                       </ul>
//                       <p>Your order is now being processed. You’ll receive another notification once it has been shipped.</p>

//                       <p>If you have any questions, feel free to contact our support team.</p>

//                       <p>Thank you for shopping with us!</p>
//                       <p>Best regards,</p>
//                       <h3>The Mystrerry Pet Shop</h3>`;
//     // Mail Send
//     sendMail(order.address.email, subject, "", orderText);

//     return res.status(200).json({
//       message: "Payment updated & stock reduced successfully",
//       response: "success",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Payment Update Error:", error);
//     return res.status(500).json({
//       message: "Server Error",
//       response: "failed",
//     });
//   }
// };

const updatePaymentStatus = async (req, res) => {
  try {
    const { id, transactionNo } = req.body;

    if (!id || !transactionNo) {
      return res.status(400).json({
        message: "Order ID and transactionNo are required",
        response: "failed",
      });
    }

    // ✅ 1. Get Order
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        response: "failed",
      });
    }

    // ✅ 2. Prevent duplicate payment update
    if (order.paymentStatus === "success") {
      return res.status(400).json({
        message: "Payment already completed",
        response: "failed",
      });
    }

    // ✅ 3. Reduce Product Stock (NO package_size)
   for (const item of order.items) {

  // ================= Variant Product =================
  if (item.isVariant && item.variant_id) {

    await Product.findOneAndUpdate(
      {
        _id: item.product_id,
        "variants._id": item.variant_id,
      },
      {
        $inc: {
          "variants.$.quantity": -item.quantity,
        },
      }
    );

  }

  // ================= Normal Product =================
  else {

    await Product.findByIdAndUpdate(
      item.product_id,
      {
        $inc: {
          quantity: -item.quantity,
        },
      }
    );

  }

}

    // ✅ 4. Apply coupon usage AFTER success
    if (order.couponCode) {
      const coupon = await Discount.findOne({ code: order.couponCode });

      if (coupon) {
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    // ✅ 5. Update payment status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        paymentStatus: "success", // 🔥 lowercase
        transactionNo: transactionNo,
      },
      { new: true },
    );

    const notification = await Notification.create({
      title: "Payment Received",
      message: `${order.fullName} paid ₹${order.totalPrice}`,
      type: "payment",
      link: "/admin/orders",
      meta: {
        orderId: order._id,
        customer: order.fullName,
        amount: order.totalPrice,
        transactionNo,
      },
    });

    try {
      const io = getIO();
      io.emit("new-notification", notification);

      console.log(`💰 Payment Notification Sent: ${order.fullName}`);
    } catch (err) {
      console.log("Socket Emit Error:", err.message);
    }

    // ✅ 6. Send Email
    try {
      if (order.address?.email) {
        const subject = `Order Confirmed – #${order._id}`;

        const orderText = `
          <h2>Hello ${order.fullName}</h2>
          <p>Thank you for your order! 🎉</p>

          <ul>
            <li><b>Order ID:</b> #${order._id}</li>
            <li><b>Date:</b> ${new Date(order.createdAt).toLocaleString()}</li>
            <li><b>Payment:</b> ${order.paymentMode}</li>
            <li><b>Total:</b> ₹${order.totalPrice}</li>
          </ul>

          <p>Your order is now being processed 🚀</p>

          <p>Thanks for shopping with us ❤️</p>
        `;

        // await sendMail(order.address.email, subject, "", orderText);
      }
    } catch (mailErr) {
      console.log("Mail error:", mailErr.message);
    }

    return res.status(200).json({
      message: "Payment success & stock updated",
      response: "success",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Payment Update Error:", error);

    return res.status(500).json({
      message: "Server Error",
      response: "failed",
    });
  }
};

// Get all Carousels
const getCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({ createdAt: -1 }); // Sort by latest

    // No carousels found
    if (!carousels || carousels.length === 0) {
      return res.status(404).json({
        message: "No Carousels found",
        response: "failed",
        carousels: [],
      });
    }

    // Success
    res.status(200).json({
      message: "Carousels retrieved successfully",
      response: "success",
      carousels,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch Carousels",
      response: "failed",
      error: err.message,
    });
  }
};
// Get all Reel
const getReel = async (req, res) => {
  try {
    const reel = await Reel.find().sort({ createdAt: -1 }); // Sort by latest

    // No carousels found
    if (!reel || reel.length === 0) {
      return res.status(404).json({
        message: "No Reels found",
        response: "failed",
        reel: [],
      });
    }

    // Success
    res.status(200).json({
      message: "Reels retrieved successfully",
      response: "success",
      reel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch Reels",
      response: "failed",
      error: err.message,
    });
  }
};

// Search Products by Slug
const searchProducts = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
        response: "failed",
      });
    }

    // Convert slug into readable search text
    const searchText = slug.replace(/-/g, " ").trim(); // "pet-products" → "pet products"

    // Create regex for partial search (case-insensitive)
    const regex = new RegExp(searchText, "i");

    // Search in multiple fields
    const products = await Product.find({
      $or: [
        { product_name: regex },
        { category: regex },
        { sub_category: regex },
        { description: regex },
      ],
    });

    res.status(200).json({
      message: "Search results",
      response: "success",
      products,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      response: "failed",
      error: error.message,
    });
  }
};

// Add Subscriber Controller
const addSubscriber = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ response: "failed", message: "All fields are required" });
    }

    // Check if email already exists
    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ response: "error", message: "Email already subscribed" });
    }

    const subscriber = await Subscribe.create({ name, email, phone });

    res.status(201).json({
      response: "success",
      message: "Subscriber added successfully",
      data: subscriber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "failed", message: "Server error" });
  }
};

// Transaction Creation Helper

const createTransaction = async (data) => {
  try {
    // 🔴 BASIC VALIDATION
    if (!data.user || !data.type || !data.amount) {
      console.log("❌ Invalid Transaction Data:", data);
      return null;
    }

    // 🔑 UNIQUE TRANSACTION ID
    const txnId = "TXN-" + uuidv4().slice(0, 8).toUpperCase();

    // 💾 CREATE TRANSACTION
    const transaction = await Transaction.create({
      user: data.user._id,
      userId: data.user.userId,

      type: data.type,
      amount: data.amount,

      walletType: data.walletType || "earningWallet",

      fromUser: data.fromUser?._id || null,
      fromUserId: data.fromUser?.userId || null,

      level: data.level || null,
      pool: data.pool || null,

      description: data.description || "",

      transactionId: txnId,
      status: "success",
    });

    // 💰 WALLET UPDATE (VERY IMPORTANT 🔥)
    if (data.walletType && data.amount) {
      if (data.walletType === "earningWallet") {
        data.user.earningWallet += data.amount;
      } else if (data.walletType === "mainWallet") {
        // data.user.mainWallet += data.amount;
      } else if (data.walletType === "repurchaseWallet") {
        data.user.repurchaseWallet += data.amount;
      }

      await data.user.save();
    }

    return transaction;
  } catch (error) {
    console.error("❌ Transaction Error:", error.message);

    // ❌ FAILED TRANSACTION LOG (optional but best)
    await Transaction.create({
      user: data.user?._id,
      userId: data.user?.userId,
      type: data.type || "admin_adjustment",
      amount: data.amount || 0,
      status: "failed",
      description: error.message,
    });

    return null;
  }
};

const distributeFounderBonus = async (amount, fromUser) => {
  const founders = await Founder.find({ status: true }).populate("userId");

  if (!founders.length) return;

  const share = amount / founders.length;

  for (let f of founders) {
    await createTransaction({
      user: f.userId,
      type: "founder_bonus",
      amount: share,
      fromUser,
      description: "Founder Bonus",
    });
  }
};

const distributeFranchise = async (user, amount) => {
  const percentMap = {
    pincode: 2,
    block: 1,
    district: 0.5,
    state: 0.5,
  };

  for (let key of Object.keys(percentMap)) {
    const franchise = await Franchise.findOne({
      [key]: user[key],
      status: "approved",
    }).populate("userId");

    if (franchise) {
      const income = (amount * percentMap[key]) / 100;

      await createTransaction({
        user: franchise.userId,
        type: "franchise_income",
        amount: income,
        fromUser: user,
        description: `${key} Franchise Income`,
      });
    }
  }
};

const SALARY_LEVELS = [
  { team: 30, percent: 4 },
  { team: 300, percent: 2 },
  { team: 3000, percent: 1 },
  { team: 30000, percent: 1 },
  { team: 300000, percent: 1 },
];

const checkSalary = async (user) => {
  for (let i = SALARY_LEVELS.length - 1; i >= 0; i--) {
    if (user.totalTeam >= SALARY_LEVELS[i].team) {
      user.salaryLevel = i + 1;
      await user.save();
      break;
    }
  }
};

const checkPerformanceBonus = async (user) => {
  const level1 = user.levelStats.get(1) || 0;

  const joinDays =
    (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24);

  if (joinDays > 30) return;

  const rewards = {
    10: 1000,
    20: 2000,
    30: 3000,
    40: 4000,
    50: 5000,
  };

  const achieved = user.performance.bonusAchieved || new Map();

  for (let key in rewards) {
    if (level1 >= Number(key) && !achieved.get(key)) {
      await createTransaction({
        user,
        type: "performance_bonus",
        amount: rewards[key],
        description: `Performance Bonus ${key}`,
      });

      achieved.set(key, true);
      user.performance.bonusAchieved = achieved;

      await user.save();
    }
  }
};

const buyPrime = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await User.findById(userId).populate("referredBy");

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.isPrime) {
      return res.status(400).json({ msg: "Already Prime User" });
    }

    // 🔥 PLAN
    const PLAN = {
      amount: 2000,
      gst: 360,
    };

    const totalAmount = PLAN.amount + PLAN.gst;

    // =========================
    // ✅ ACTIVATE PRIME
    // =========================
    user.isPrime = true;
    user.primeStartDate = new Date();

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    user.primeEndDate = endDate;

    user.couponCode = user.userId;
    user.rank = "Prime Member";

    await user.save();
    // =========================
    // =========================
    // 🔥 UPDATE LEVEL STATS (OPTIMIZED)
    // =========================
    // =========================
    // 🔥 BUILD PARENTPATH (userId based)
    // =========================
    let parentPath = [];
    let current = user.referredBy;

    while (current) {
      const parent = await User.findById(current);

      if (!parent) break;

      parentPath.push(parent.userId); // ✅ store userId (string)
      current = parent.referredBy;
    }

    // ✅ save parentPath
    user.parentPath = parentPath;
    await user.save();

    // =========================
    // 🔥 UPDATE LEVEL STATS
    // =========================
    for (let i = 0; i < parentPath.length; i++) {
      const parentUserId = parentPath[i];

      // ✅ IMPORTANT: find by userId (NOT _id)
      const parent = await User.findOne({ userId: parentUserId });

      if (!parent) {
        continue;
      }

      const levelKey = String(i + 1);

      // ✅ FIX: Handle Map properly
      const currentCount = parent.levelStats.get(levelKey) || 0;
      parent.levelStats.set(levelKey, currentCount + 1);
      parent.markModified("levelStats"); // 🔥 VERY IMPORTANT

      // ✅ RANK UPDATE
      const get = (lvl) => parent.levelStats.get(String(lvl)) || 0;

      if (parent.rank === "Prime Member" && get(1) >= 10) {
        parent.rank = "Standard";
      } else if (parent.rank === "Standard" && get(2) >= 10) {
        parent.rank = "Bronze";
      } else if (parent.rank === "Bronze" && get(3) >= 10) {
        parent.rank = "Silver";
      } else if (parent.rank === "Silver" && get(4) >= 10) {
        parent.rank = "Gold";
      } else if (parent.rank === "Gold" && get(5) >= 10) {
        parent.rank = "Platinum";
      } else if (parent.rank === "Platinum" && get(6) >= 10) {
        parent.rank = "Director";
      }

      await parent.save({ validateBeforeSave: false });
    }

    // =========================
    // ✅ SUBSCRIPTION SAVE
    // =========================
    await Subscribe.create({
      userId: user._id,
      subscriptionId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.mobile,
      amount: PLAN.amount,
      gst: PLAN.gst,
      totalAmount,
      startDate: new Date(),
      endDate,
      couponCode: user.userId,
    });

    // =========================
    // 💸 SELF TRANSACTION
    // =========================
    await createTransaction({
      user,
      type: "subscription",
      amount: totalAmount,
      walletType: "mainWallet",
      description: "Prime Purchase",
    });

    // =========================
    // 🔥 LEVEL INCOME
    // =========================
    const LEVEL_PERCENT = [
      10, 5, 3, 2, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
      0.5, 0.5,
    ];

    // current = null;
    let currentParent = user.referredBy;

    for (let i = 0; i < 20; i++) {
      if (!currentParent) break;

      const parent = await User.findById(currentParent);
      if (!parent) break;

      // Only Prime users
      if (!parent.isPrime) {
        currentParent = parent.referredBy;
        continue;
      }

      // 🔓 UNLOCK LOGIC
      let unlockLevel = parent.totalDirect >= 10 ? 20 : parent.totalDirect;

      if (i + 1 > unlockLevel) {
        currentParent = parent.referredBy;
        continue;
      }

      const percent = LEVEL_PERCENT[i];
      const income = (PLAN.amount * percent) / 100;

      const freshUser = await User.findById(parent._id);

      console.log(income, "Level", i + 1, "Income for", freshUser.userId);

      await createTransaction({
        user: freshUser,
        type: "level_income",
        amount: income,
        fromUser: user,
        level: i + 1,
        description: `Level ${i + 1} Income`,
      });

      currentParent = parent.referredBy;
    }

    await checkSalary(user);
    await checkPerformanceBonus(user);
    await distributeFranchise(user, PLAN.amount);
    await distributeFounderBonus(PLAN.amount * 0.05, user);

    // =========================
    // 👥 UPDATE SPONSOR
    // =========================
    if (user.referredBy) {
      const sponsor = await User.findById(user.referredBy);

      sponsor.totalDirect += 1;
      sponsor.performance.directCount += 1;

      // 🔥 RANK LOGIC (IMPORTANT)
      if (sponsor.isPrime && sponsor.totalDirect >= 10) {
        sponsor.rank = "Standard";
      }

      if (sponsor.isPrime && sponsor.totalDirect >= 20) {
        sponsor.rank = "Bronze";
      }

      if (sponsor.isPrime && sponsor.totalDirect >= 50) {
        sponsor.rank = "Silver";
      }

      await sponsor.save();
    }

    // =========================
    // 🎉 RESPONSE
    // =========================
    // await sendMail(
    //   user.email,
    //   "Prime Activated",
    //   "Your Prime is active",
    //   `<h1>Welcome ${user.name}</h1>`,
    // );
    res.json({
      success: true,
      message: "🔥 Prime Activated Successfully",
      couponCode: user.userId,
    });
  } catch (err) {
    console.log("BUY PRIME ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get All Franchises
const getAllSubscribe = async (req, res) => {
  try {
    const subscribe = await Subscribe.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      response: "success",
      data: subscribe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Transactions
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      message: "Data Found",
      response: "success",
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLevelIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Transaction.find({
      user: userId,
      type: "level_income",
    })
      .populate("fromUser", "name userId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: incomes,
    });
  } catch (err) {
    console.log("Level Income Error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};



// ================= GET ALL ACTIVE COLLECTIONS =================
const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      isActive: true,
    }).sort({ sortOrder: 1 });

    res.status(200).json({
      message: "Collections fetched successfully",
      response: "success",
      collections,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch collections",
      response: "failed",
      error: err.message,
    });
  }
};

// ================= GET FEATURED COLLECTIONS =================
const getFeaturedCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      isActive: true,
      isFeatured: true,
    }).sort({ sortOrder: 1 });

    res.status(200).json({
      message: "Featured collections fetched successfully",
      response: "success",
      collections,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch featured collections",
      response: "failed",
      error: err.message,
    });
  }
};

// ================= GET COLLECTION BY SLUG =================
const getCollectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const collection = await Collection.findOne({
      slug,
      isActive: true,
    });

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        response: "failed",
        collection: null,
      });
    }

    res.status(200).json({
      message: "Collection fetched successfully",
      response: "success",
      collection,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch collection",
      response: "failed",
      error: err.message,
    });
  }
};



module.exports = {
  home,
  about,
  adminRegister,
  adminLogin,
  register,
  login,
  getUserById,
  sendOtp,
  verifyOtp,
  getProduct,
  getProductById,
  getProductByCategoryName,
  addContactUs,
  getCategories,
  getCategoryById,
  getCategoryByName,
  getSubCategories,
  getSubCategoryById,
  getSubCategoryByName,
  getSubcategoryByCategoryName,
  getProductbyProductName,
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updatePaymentStatus,
  applyDiscount,
  getCarousels,
  getReel,
  searchProducts,
  addSubscriber,
  changePassword,
  createTransaction,
  buyPrime,
  getAllSubscribe,
  getUserTransactions,
  getLevelIncome,
   getCollections,
  getFeaturedCollections,
  getCollectionBySlug,
  updateProfile,
  addAddress,
  getAddresses,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
};
