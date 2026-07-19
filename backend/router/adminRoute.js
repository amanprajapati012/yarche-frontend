const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { adminAuth } = require('../controller/auth-controller');
const { getCategoryById, getSubCategoryById, } = require('../controller');
const {
  addCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addProduct,
  updateProduct,
  deleteProduct,

  updateProductTag, // 👈 ADD

  getUsers,
  getAllContactUs,
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  updateDeliveryStatus,
  getOrderById,
  addCarousel,
  getCarouselById,
  updateCarousel,
  getAllCarousel,
  deleteCarousel,
  addReel,
  getReelById,
  updateReel,
  deleteReel,
  getAllSubscribers,
    getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createTestNotification,
  addCollection,
  getCollectionById,
  updateCollection,
  getAllCollections,
  deleteCollection,
  addBanner,
getBannerById,
updateBanner,
getAllBanner,
deleteBanner,
 addCombo,
  updateCombo,
  getAllCombos,
  getComboById,
  deleteCombo,
} = require("../controller/admin-controller");

router.use((req, res, next) => {
  console.log("🔥 ADMIN ROUTE HIT:", req.method, req.url);
  next();
});

// // Get All User
router.get('/users', getUsers);

router.post(
  "/collection",
  upload.array("images", 2),
  adminAuth,
  addCollection
);

router.put(
  "/collection/:id",
  upload.array("images", 2),
  adminAuth,
  updateCollection
);
router.get(
  "/collections",
  adminAuth,
  getAllCollections
);
router.get(
  "/collection/:id",
  adminAuth,
  getCollectionById
);

router.delete(
  "/collection/:id",
  adminAuth,
  deleteCollection
);

// ================= Banner Routes =================

// Add Banner
router.post(
  "/banner",
  upload.array("image", 1),
  // adminAuth,
  addBanner
);

// Get All Banner
router.get(
  "/banner",
  // adminAuth,
  getAllBanner
);

// Get Banner By Id
router.get(
  "/banner/:id",
  // adminAuth,
  getBannerById
);

// Update Banner
router.put(
  "/updatebanner/:id",
  upload.array("image", 1),
  // adminAuth,
  updateBanner
);

// Delete Banner
router.delete(
  "/deletebanner/:id",
  // adminAuth,
  deleteBanner
);

// Add Course
router.post(
  "/product",
  upload.any(),
  addProduct
);

router.put(
  "/updateproduct/:id",
  upload.any(),
  updateProduct
);

// Delete Courese Route
router.delete('/deleteproduct/:id', deleteProduct);

router.patch(
  "/product-tags/:id",
  updateProductTag
);

// Add Course Category Route
router.post('/productcategory', upload.array('images', 5), 
// adminAuth, 
addCategory);

// UpdateCourse Category by Route
router.put('/updateproductcategory/:id', upload.array('images', 5), 
// adminAuth, 
updateCategory);

// Get Course Category by Route
router.get('/productcategory/:id', getCategoryById);

// Delete Courese Category Route
router.delete('/deleteproductcategory/:id', deleteCategory);

// Add Course Sub Category Route
router.post('/productsubcategory', upload.array('images', 5), 
// adminAuth, 
addSubCategory);

// UpdateCourse Category by Route
router.put('/updateproductsubcategory/:id', upload.array('images', 5), 
// adminAuth, 
updateSubCategory);

// Get Product Category by Route
router.get('/productsubcategory/:id', getSubCategoryById);

// Delete Courese Category Route
router.delete('/deleteproductsubcategory/:id', deleteSubCategory);

// Get All Contact Us Route
router.get("/contactsus", getAllContactUs);

// Create Discount Route
router.post("/discount", adminAuth, createDiscount);

router.post(
  "/add-combo",
  upload.array("images", 5), // max 5 images, jitni chahiye utni badha lena
  addCombo
);
 
router.put(
  "/update-combo/:id",
  upload.array("images", 5),
  updateCombo
);
 
router.get("/get-combos", getAllCombos);
 
router.get("/get-combo/:id", getComboById);
 
router.delete("/delete-combo/:id", deleteCombo);

// Update Discount
router.put("/updateDiscount/:id", 
    // adminAuth, 
    updateDiscount)

// Get All Discount
router.get("/discounts", getAllDiscounts);

// Get Discount by Id 
router.get("/discount/:id", getDiscountById);

// Delete Discount
router.delete("/deletediscount/:id", deleteDiscount)


router.get(
  "/notifications",
  adminAuth,
  getNotifications
);

router.put(
  "/notifications/read-all",
  adminAuth,
  markAllNotificationsRead
);

router.put(
  "/notifications/:id/read",
  adminAuth,
  markNotificationRead
);

router.post(
  "/notifications/test",
  adminAuth,
  createTestNotification
);

// Get Order by Id
router.get("/order/:id", getOrderById);

// Update Delivery Status
router.patch("/udpatedelivery/:orderId", 
    // adminAuth, 
    updateDeliveryStatus);

// Add Carousel route
router.post("/carousel", upload.array('images',5), 
// adminAuth, 
addCarousel);

// Get Carousel by ID
router.get("/carousel/:id", getCarouselById);

// Update Carousel By Id 
router.put("/updatecarousel/:id", upload.array("images", 5),
// adminAuth, 
updateCarousel);

// Delete Carousel
router.delete("/deletecarousel/:id", deleteCarousel);

router.get("/carousel", getAllCarousel);

// Add Reel route
router.post("/reel", upload.array('images',5), 
// adminAuth, 
addReel);

// Get Reel by ID
router.get("/reel/:id", getReelById);

// Update Reel By Id 
router.put("/updatereel/:id", upload.array("images", 5), 
// adminAuth, 
updateReel);



// Delete Reel
router.delete("/deletereel/:id", deleteReel);

// Get All Subscribers
router.get("/subscribers", getAllSubscribers);

module.exports = router;
