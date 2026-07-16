const express = require('express');
const {
  home,
  about,
  adminRegister,
  adminLogin,
  getCategories,
  getSubCategories,
  getProduct,
  getCategoryById,
  getSubCategoryById,
  getProductById,
  getCategoryByName,
  getSubCategoryByName,
  getProductByCategoryName,
  getSubcategoryByCategoryName,
  addContactUs,
  getProductbyProductName,
  register,
  login,
  createOrder,
  getAllOrders,
  updatePaymentStatus,
  applyDiscount,
  getOrdersByUser,
  getCarousels,
  getReel,
  searchProducts,
  addSubscriber,
  changePassword,
  buyPrime,
  getAllSubscribe,
  getUserTransactions,
  getUserById,
  sendOtp,
  verifyOtp,
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
      getBanners,
} = require('../controller');

// ✅ IMPORTANT: middleware se import
const { verifyToken } = require('../middleware/auth');


const upload = require('../middleware/upload');
const { adminAuth } = require('../controller/auth-controller');
const router = express.Router();

// Get Home Routes
router.get('/', home);

// Get About Route
router.get('/about', about);

// Post Admin Register User Route
router.post('/admin/register', adminRegister);

// Post Admin Login User Route
router.post('/admin/login', adminLogin);

// Regiter User
router.post("/register", register)

// Login User
router.post("/login", login)

router.post("/address", verifyToken, addAddress);

// Get all addresses
router.get("/address", verifyToken, getAddresses);


router.patch("/address/:id", verifyToken, updateAddress);
// Delete address
router.delete("/address/:id", verifyToken, deleteAddress);

// Set default address
router.patch("/address/default/:id", verifyToken, setDefaultAddress);

router.patch("/user/update", verifyToken, updateProfile);

router.get("/level", verifyToken, getLevelIncome);

// Send OTP Route
router.post("/send-otp", sendOtp);

// Verify OTP Route
router.post("/verify-otp", verifyOtp)

// Get Categories Route
router.patch("/forgot-password", changePassword);

// Get User by Id
router.get("/user/:id", getUserById);

// Buy Prime Route
router.post("/buy-prime", verifyToken, buyPrime);
//change password
router.patch("/change-password", changePassword);

// Get All Course Categories Route
router.get('/productcategories', getCategories);

// Get All Course Aub Categories Route
router.get('/productsubcategories', getSubCategories);

// Get All Product Route
router.get('/products', getProduct);

// // Get Product Category by Name by Route
router.get('/productcategorybyname/:category', getCategoryByName);

// // Get Product Category by Name by Route
router.get('/productbyname/:product_name', getProductbyProductName);

// // Get Product Category by Nameby Route
router.get('/productsubcategorybyname/:sub_category', getSubCategoryByName);

// // Get Product Sub Category by Category Name by Route
router.get('/productsubcategorybycategoryname/:categoryName', getSubcategoryByCategoryName);

// Get Product by Id Route
router.get('/product/:id', getProductById);

// Get Product by Id Route
router.get('/productbycategoryname/:categoryName', getProductByCategoryName);

// Add Contact Us Route
router.post("/contactus", addContactUs);

// crete Odrder Route
router.post("/order", createOrder);

// get All Order route
router.get("/orders", getAllOrders);

// Get Order by User Id
router.get("/orderbyuser/:userId", getOrdersByUser);

// Apply Discount
router.patch("/applydiscount", applyDiscount);

// Update Payment
router.patch("/updatepayment", updatePaymentStatus);

// Get All Carousels
router.get("/carousels", getCarousels);

// Get All Banners
router.get("/banners", getBanners);

// Get All Reels
router.get("/reels", getReel);

// Searh Product data
router.get("/search/:slug", searchProducts)

// Add Subscriber Route
router.post("/subscribe", addSubscriber);

// get All Subscribe
router.get("/allsubscribe", getAllSubscribe);

// get User Transactions
router.get("/transactions/:userId", getUserTransactions);
// Get all active collections (homepage sections)
router.get("/collections", getCollections);

// Get featured collections only
router.get("/collections/featured", getFeaturedCollections);

// Get collection by slug (collection page)
router.get("/collection/:slug", getCollectionBySlug);


module.exports = router;
