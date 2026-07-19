const ContactUs = require("../models/contactUsModel");
const ProductCategory = require("../models/productCategoryModel");
const Product = require("../models/productModel");
const ProductSubCategory = require("../models/productSubCategoryModel");
const User = require("../models/userModel");
const Discount = require("../models/discountModel");
const Order = require("../models/orderModel");
const Carousel = require("../models/carouselModel");
const Subscribe = require("../models/subscribeModel");
const Banner = require("../models/Banner");
// Delete Crousel by ID
const fs = require("fs");
const path = require("path");
const Reel = require("../models/reelModels");
const Notification = require("../models/Notification");
const Collection = require("../models/CollectionModel");
const Combo = require("../models/Combo"); // ya jo bhi tumhara actual path/filename hai
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");

// get App User Cotroller
const getUsers = async (req, res) => {
  try {
    // Get Data
    const users = await User.find().select("-password");

    // Check Data
    if (users.length === 0) {
      return res.json({ message: "Data not found", response: "failed" });
    }

    res.json({ message: "Data Found", response: "success", user: users });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add Product Controller
// const addProduct = async (req, res) => {

//   try {
//     const {
//       product_name,
//       breed_size,
//       food_type,
//       brand,
//       age,
//       mystrrey_choice,
//       like,
//       description,
//       full_description,
//       category,
//       sub_category,
//       package_size,
//     } = req.body;

//     // ✅ Basic validation
//     if (
//       !product_name ||
//       !description ||
//       !full_description ||
//       !category ||
//       !sub_category
//     ) {
//       return res.status(400).json({
//         message:
//           "Product name, description, Description, Full Description, category are required",
//         response: "failed",
//       });
//     }

//         let parsedPakage = [];
//     if (package_size) {
//       if (typeof package_size === "string") {
//         parsedPakage = JSON.parse(package_size);
//       } else if (Array.isArray(package_size)) {
//         parsedPakage = package_size;
//       }
//     }

//     // ✅ Handle uploaded images
//     const imageFiles = req.files || []; // from multer
//     const imagePaths = imageFiles.map(
//       (file) => `/uploads/product/${file.filename}`
//     );

//     // ✅ Create new course
//     const newProduct = new Product({
//       product_name,
//       description,
//       breed_size,
//       food_type,
//       brand,
//       age,
//       mystrrey_choice,
//       like,
//       full_description,
//       images: imagePaths,
//       category,
//       sub_category,
//       package_size: parsedPakage,
//     });

//     await newProduct.save();

//     res.status(201).json({
//       message: "Product added successfully",
//       response: "success",
//       data: newProduct,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Failed to add Product",
//       response: "failed",
//       error: err.message,
//     });
//   }
// };
const addProduct = async (req, res) => {
  try {
    const {
      productSku,
      name,
      title,
      description,
      full_description,
      category,
      sub_category,
      price,
      discountedPrice,
      landingPrice,
      quantity,
      variants,
      tags,
    } = req.body;

    if (
      !productSku ||
      !name ||
      !title ||
      !description ||
      !full_description ||
      !category ||
      !sub_category ||
      !price
    ) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const parsedVariants = variants
      ? typeof variants === "string"
        ? JSON.parse(variants)
        : variants
      : [];

    const parsedTags = tags
      ? typeof tags === "string"
        ? JSON.parse(tags)
        : tags
      : [];

    const files = req.files || [];

    // ============================
    // Upload Product Images
    // ============================

    const productImages = await Promise.all(
      files
        .filter((file) => file.fieldname === "productImages")
        .map(async (file) => {
          const result = await uploadToCloudinary(file.buffer);

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        }),
    );

    // ============================
    // Upload Variant Images
    // ============================

    const finalVariants = await Promise.all(
      parsedVariants.map(async (variant, index) => {
        const variantFiles = files.filter(
          (file) => file.fieldname === `variantImages_${index}`,
        );

        const variantImages = await Promise.all(
          variantFiles.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer);

            return {
              url: result.secure_url,
              public_id: result.public_id,
            };
          }),
        );

        return {
          ...variant,
          images: variantImages,
          useProductImages: variantImages.length === 0,
        };
      }),
    );

    const product = await Product.create({
      productSku,
      name,
      title,
      description,
      full_description,
      category,
      sub_category,

      price,
      discountedPrice,
      landingPrice,
      quantity,

      tags: parsedTags,

      images: productImages,
      variants: finalVariants,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product Controller
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Parse formData JSON values
//     let removeImages = [];
//     let existingImages = [];

//     if (req.body.removeImages) {
//       removeImages = JSON.parse(req.body.removeImages);
//     }
//     if (req.body.existingImages) {
//       existingImages = JSON.parse(req.body.existingImages);
//     }

//     console.log(req.body.oldImages)

//     const {
//       product_name,
//       description,
//       breed_siz
//       food_type,
//       brand,
//       age,
//       mystrrey_choice,
//       keyword,
//       full_description,
//       category,
//       sub_category,
//       package_size,
//     } = req.body;

//     // Validation
//     if (
//       !product_name ||
//       !description ||
//       !full_description ||
//       !category ||
//       !sub_category
//     ) {
//       return res.status(400).json({
//         message:
//           "Product name, description, full description, category, and subcategory are required",
//         response: "failed",
//       });
//     }

//     // Check product exists
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//         response: "failed",
//       });
//     }

//     // Update Pakage Size
//     if (package_size) {
//       try {
//         const parsedPakage = JSON.parse(package_size);
//         if (Array.isArray(parsedPakage)) {
//           product.package_size = parsedPakage.map((pkg) => ({
//             package: pkg.package || "",
//             quantity: pkg.quantity || "",
//             price: pkg.price || "",
//             discountedPrice: pkg.discountedPrice || "",
//           }));
//         }
//       } catch (err) {
//         console.error("Invalid buttons JSON:", err);
//       }
//     }

//     // Handle uploaded new images
//     const uploadedFiles = req.files || [];
//     const newImagePaths = uploadedFiles.map(
//       (file) => `/uploads/product/${file.filename}`
//     );

//     // Remove images user deleted
//     if (removeImages.length > 0) {
//       product.images = product.images.filter(
//         (img) => !removeImages.includes(img)
//       );
//     }

//     // ✅ Add new images if any
//     if (newImagePaths.length > 0) {
//       product.images = [...product.images, ...newImagePaths];
//     }

//     // ✅ Update fields
//     product.product_name = product_name;
//     product.description = description;
//     product.breed_size = breed_size;
//     product.food_type = food_type;
//     product.brand = brand;
//     product.age =  age;
//     product.mystrrey_choice =  mystrrey_choice,
//     product.keyword = keyword;
//     product.full_description = full_description;
//     product.category = category;
//     product.sub_category = sub_category;

//     await product.save();

//     res.status(200).json({
//       message: "Product updated successfully",
//       response: "success",
//       data: product,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Failed to update product",
//       response: "failed",
//       error: err.message,
//     });
//   }
// };
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     /* -------------------- READ oldImages FROM FORM-DATA -------------------- */
//     let oldImages = [];

//     if (req.body.oldImages) {
//       // If only one image, multer gives string
//       if (Array.isArray(req.body.oldImages)) {
//         oldImages = req.body.oldImages;
//       } else {
//         oldImages = [req.body.oldImages];
//       }
//     }

//     const {
//       product_name,
//       description,
//       breed_size,
//       food_type,
//       brand,
//       age,
//       mystrrey_choice,
//       keyword,
//       full_description,
//       category,
//       sub_category,
//       package_size,
//     } = req.body;

//     /* -------------------- VALIDATION -------------------- */
//     if (
//       !product_name ||
//       !description ||
//       !full_description ||
//       !category ||
//       !sub_category
//     ) {
//       return res.status(400).json({
//         message:
//           "Product name, description, full description, category, and subcategory are required",
//         response: "failed",
//       });
//     }

//     /* -------------------- FIND PRODUCT -------------------- */
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//         response: "failed",
//       });
//     }

//     /* -------------------- UPDATE PACKAGE SIZE -------------------- */
//     if (package_size) {
//       try {
//         const parsedPackage = JSON.parse(package_size);

//         if (Array.isArray(parsedPackage)) {
//           product.package_size = parsedPackage.map((pkg) => ({
//             package: pkg.package || "",
//             quantity: pkg.quantity || "",
//             price: pkg.price || "",
//             discountedPrice: pkg.discountedPrice || "",
//           }));
//         }
//       } catch (err) {
//         console.error("Invalid package_size JSON:", err);
//       }
//     }

//     /* -------------------- HANDLE NEW IMAGES -------------------- */
//     const uploadedFiles = req.files || [];

//     const newImagePaths = uploadedFiles.map(
//       (file) => `/uploads/product/${file.filename}`
//     );

//     /* -------------------- REMOVE DELETED IMAGES -------------------- */
//     // Images present in DB but NOT present in oldImages → deleted by user
//     const removedImages = product.images.filter(
//       (img) => !oldImages.includes(img)
//     );

//     // Remove from disk
//     removedImages.forEach((imgPath) => {
//       const fullPath = path.join(process.cwd(), imgPath);
//       if (fs.existsSync(fullPath)) {
//         fs.unlinkSync(fullPath);
//       }
//     });

//     // Keep only existing images user kept
//     product.images = [...oldImages];

//     /* -------------------- ADD NEW IMAGES -------------------- */
//     if (newImagePaths.length > 0) {
//       product.images = [...product.images, ...newImagePaths];
//     }

//     /* -------------------- UPDATE FIELDS -------------------- */
//     product.product_name = product_name;
//     product.description = description;
//     product.breed_size = breed_size;
//     product.food_type = food_type;
//     product.brand = brand;
//     product.age = age;
//     product.mystrrey_choice = mystrrey_choice;
//     product.keyword = keyword;
//     product.full_description = full_description;
//     product.category = category;
//     product.sub_category = sub_category;

//     /* -------------------- SAVE -------------------- */
//     await product.save();

//     return res.status(200).json({
//       message: "Product updated successfully",
//       response: "success",
//       data: product,
//     });
//   } catch (err) {
//     console.error("Update Product Error:", err);

//     return res.status(500).json({
//       message: "Failed to update product",
//       response: "failed",
//       error: err.message,
//     });
//   }
// };

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      productSku,
      name,
      title,
      description,
      full_description,
      category,
      sub_category,
      price,
      discountedPrice,
      landingPrice,
      quantity,
      variants,
      oldImages,
      tags,
    } = req.body;

    const parsedVariants = variants
      ? typeof variants === "string"
        ? JSON.parse(variants)
        : variants
      : [];

    const parsedTags = tags
      ? typeof tags === "string"
        ? JSON.parse(tags)
        : tags
      : [];

    const files = req.files || [];

    // ==========================
    // Existing Product Images
    // ==========================

    const existingImages = oldImages
      ? typeof oldImages === "string"
        ? JSON.parse(oldImages)
        : oldImages
      : [];

    // ==========================
    // Upload New Product Images
    // ==========================

    const uploadedProductImages = await Promise.all(
      files
        .filter((file) => file.fieldname === "productImages")
        .map(async (file) => {
          const result = await uploadToCloudinary(file.buffer);

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        }),
    );

    product.images = [...existingImages, ...uploadedProductImages];

    // ==========================
    // Upload Variant Images
    // ==========================

    product.variants = await Promise.all(
      parsedVariants.map(async (variant, index) => {
        const variantFiles = files.filter(
          (file) => file.fieldname === `variantImages_${index}`,
        );

        const uploadedVariantImages = await Promise.all(
          variantFiles.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer);

            return {
              url: result.secure_url,
              public_id: result.public_id,
            };
          }),
        );

        const finalImages =
          uploadedVariantImages.length > 0
            ? uploadedVariantImages
            : variant.images || [];

        return {
          ...variant,
          images: finalImages,
          useProductImages: finalImages.length === 0,
        };
      }),
    );

    // ==========================
    // Update Product Fields
    // ==========================

    product.productSku = productSku;
    product.name = name;
    product.title = title;
    product.description = description;
    product.full_description = full_description;
    product.category = category;
    product.sub_category = sub_category;

    product.price = price;
    product.discountedPrice = discountedPrice;
    product.landingPrice = landingPrice;
    product.quantity = quantity;

    product.tags = parsedTags;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================
// Helper: Calculate combo total price with variant support
// ==========================

const calculateComboTotal = (parsedProducts, dbProducts) => {
  let totalPrice = 0;

  for (const comboItem of parsedProducts) {
    const dbProduct = dbProducts.find(
      (p) => p._id.toString() === comboItem.product
    );

    if (!dbProduct) {
      throw new Error("One or more selected products are invalid.");
    }

    let itemPrice = dbProduct.price;

    // Agar variant select kiya gaya hai to uski price use karo
    if (comboItem.variantId) {
      const variant = dbProduct.variants?.find(
        (v) => v._id.toString() === comboItem.variantId
      );

      if (!variant) {
        throw new Error(
          `Invalid variant selected for product "${dbProduct.name}".`
        );
      }

      itemPrice = variant.price;
    }

    totalPrice += itemPrice * (comboItem.quantity || 1);
  }

  return totalPrice;
};

// ==========================
// ADD COMBO
// ==========================

const addCombo = async (req, res) => {
  let uploadedImages = []; // cleanup ke liye bahar rakha hai

  try {
    const {
      comboSku,
      title,
      description,
      products,
      discountedPrice,
      landingPrice,
    } = req.body;

    // ==========================
    // Validation
    // ==========================

    if (!comboSku || !title || !description || !products) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const parsedProducts =
      typeof products === "string" ? JSON.parse(products) : products;

    if (!Array.isArray(parsedProducts) || parsedProducts.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Combo must contain at least 2 products.",
      });
    }

    // ==========================
    // Duplicate SKU Check
    // ==========================

    const existingCombo = await Combo.findOne({ comboSku });

    if (existingCombo) {
      return res.status(400).json({
        success: false,
        message: "Combo SKU already exists.",
      });
    }

    // ==========================
    // Validate Images (multiple)
    // ==========================

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one combo image is required.",
      });
    }

    // ==========================
    // Validate Products (image upload se pehle, taaki
    // upload karke fir turant destroy na karna pade)
    // ==========================

    const productIds = parsedProducts.map((item) => item.product);

    const dbProducts = await Product.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== new Set(productIds).size) {
      return res.status(400).json({
        success: false,
        message: "One or more selected products are invalid.",
      });
    }

    // ==========================
    // Auto Calculate Price (with variant support)
    // ==========================

    let totalPrice;

    try {
      totalPrice = calculateComboTotal(parsedProducts, dbProducts);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // ==========================
    // Upload Combo Images (multiple)
    // ==========================

    uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    const imagesData = uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    // ==========================
    // Create Combo
    // ==========================

    const combo = await Combo.create({
      comboSku,
      title,
      description,

      images: imagesData,

      products: parsedProducts,

      price: totalPrice,

      discountedPrice:
        Number(discountedPrice) > 0 ? Number(discountedPrice) : totalPrice,

      landingPrice: Number(landingPrice) > 0 ? Number(landingPrice) : 0,
    });

    return res.status(201).json({
      success: true,
      message: "Combo created successfully.",
      combo,
    });
  } catch (error) {
    console.log(error);

    // Agar images upload ho chuki thi aur beech mein error aa gaya, cleanup kar do
    if (uploadedImages.length > 0) {
      await Promise.all(
        uploadedImages.map((img) =>
          cloudinary.uploader.destroy(img.public_id).catch(() => {})
        )
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE COMBO
// ==========================

const updateCombo = async (req, res) => {
  let newUploadedImages = []; // cleanup ke liye

  try {
    const { id } = req.params;

    const combo = await Combo.findById(id);

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: "Combo not found.",
      });
    }

    const {
      comboSku,
      title,
      description,
      products,
      discountedPrice,
      landingPrice,
      isActive,
      removedImageIds, // JSON stringified array of public_id
    } = req.body;

    // ==========================
    // Validation
    // ==========================

    if (!comboSku || !title || !description || !products) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing.",
      });
    }

    const parsedProducts =
      typeof products === "string" ? JSON.parse(products) : products;

    if (!Array.isArray(parsedProducts) || parsedProducts.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Combo must contain at least 2 products.",
      });
    }

    // ==========================
    // Duplicate SKU Check
    // ==========================

    const existingSku = await Combo.findOne({
      comboSku,
      _id: { $ne: id },
    });

    if (existingSku) {
      return res.status(400).json({
        success: false,
        message: "Combo SKU already exists.",
      });
    }

    // ==========================
    // Validate Products
    // ==========================

    const productIds = parsedProducts.map((item) => item.product);

    const dbProducts = await Product.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== new Set(productIds).size) {
      return res.status(400).json({
        success: false,
        message: "One or more selected products are invalid.",
      });
    }

    // ==========================
    // Auto Calculate Price (with variant support)
    // ==========================

    let totalPrice;

    try {
      totalPrice = calculateComboTotal(parsedProducts, dbProducts);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // ==========================
    // Handle Images (remove selected + add new)
    // ==========================

    let currentImages = combo.images || [];

    // 1) Removed images (agar frontend se list aayi)
    if (removedImageIds) {
      const parsedRemovedIds =
        typeof removedImageIds === "string"
          ? JSON.parse(removedImageIds)
          : removedImageIds;

      if (Array.isArray(parsedRemovedIds) && parsedRemovedIds.length > 0) {
        await Promise.all(
          parsedRemovedIds.map((publicId) =>
            cloudinary.uploader.destroy(publicId).catch(() => {})
          )
        );

        currentImages = currentImages.filter(
          (img) => !parsedRemovedIds.includes(img.public_id)
        );
      }
    }

    // 2) New images (agar frontend se naye files aayi)
    if (req.files && req.files.length > 0) {
      newUploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      const newImagesData = newUploadedImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
      }));

      currentImages = [...currentImages, ...newImagesData];
    }

    // 3) Kam se kam 1 image to honi hi chahiye
    if (currentImages.length === 0) {
      // agar naye upload huye the, unhe bhi cleanup kar do
      if (newUploadedImages.length > 0) {
        await Promise.all(
          newUploadedImages.map((img) =>
            cloudinary.uploader.destroy(img.public_id).catch(() => {})
          )
        );
      }

      return res.status(400).json({
        success: false,
        message: "Combo must have at least one image.",
      });
    }

    combo.images = currentImages;

    // ==========================
    // Update Fields
    // ==========================

    combo.comboSku = comboSku;
    combo.title = title;
    combo.description = description;

    combo.products = parsedProducts;

    // Original Price (Auto Calculated)
    combo.price = totalPrice;

    // Discounted Price
    combo.discountedPrice =
      Number(discountedPrice) > 0 ? Number(discountedPrice) : totalPrice;

    // Landing Price
    combo.landingPrice = Number(landingPrice) > 0 ? Number(landingPrice) : 0;

    if (typeof isActive !== "undefined") {
      combo.isActive = isActive === "true" || isActive === true;
    }

    // ==========================
    // Save
    // ==========================

    await combo.save();

    return res.status(200).json({
      success: true,
      message: "Combo updated successfully.",
      combo,
    });
  } catch (error) {
    console.log(error);

    if (newUploadedImages.length > 0) {
      await Promise.all(
        newUploadedImages.map((img) =>
          cloudinary.uploader.destroy(img.public_id).catch(() => {})
        )
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL COMBOS
// ==========================

const getAllCombos = async (req, res) => {
  try {
    const combos = await Combo.find()
      .populate({
        path: "products.product",
        select: "name title images price discountedPrice quantity variants",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: combos.length,
      combos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET COMBO BY ID
// ==========================

const getComboById = async (req, res) => {
  try {
    const { id } = req.params;

    const combo = await Combo.findById(id).populate({
      path: "products.product",
      select: "name title images price discountedPrice quantity variants",
    });

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: "Combo not found.",
      });
    }

    return res.status(200).json({
      success: true,
      combo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// DELETE COMBO
// ==========================

const deleteCombo = async (req, res) => {
  try {
    const { id } = req.params;

    const combo = await Combo.findById(id);

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: "Combo not found.",
      });
    }

    if (combo.images && combo.images.length > 0) {
      await Promise.all(
        combo.images.map((img) =>
          cloudinary.uploader.destroy(img.public_id).catch(() => {})
        )
      );
    }

    await combo.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Combo deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const updateProductTag = async (req, res) => {
  const { id } = req.params;

  const { tag, checked } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (checked) {
    if (!product.tags.includes(tag)) {
      product.tags.push(tag);
    }
  } else {
    product.tags = product.tags.filter((item) => item !== tag);
  }

  await product.save();

  return res.json({
    success: true,
    tags: product.tags,
  });
};
// Delete a Product by ID (and remove its images)
// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find product first
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//         response: "failed",
//       });
//     }

//     // Delete all product images from uploads/product folder
//     if (product.images && product.images.length > 0) {
//       product.images.forEach((img) => {
//         const imagePath = path.join(
//           process.cwd(),
//           "uploads/product",
//           path.basename(img)
//         );

//         if (fs.existsSync(imagePath)) {
//           fs.unlink(imagePath, (err) => {
//             if (err) console.error("Error deleting image:", err);
//           });
//         }
//       });
//     }

//     // Delete product from DB
//     await Product.findByIdAndDelete(id);

//     res.status(200).json({
//       message: "Product deleted successfully",
//       response: "success",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Failed to delete product",
//       response: "failed",
//       error: err.message,
//     });
//   }
// };

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ==========================
    // Delete Product Images
    // ==========================

    if (product.images?.length) {
      for (const image of product.images) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.log("Product Image Delete Error:", err.message);
        }
      }
    }

    // ==========================
    // Delete Variant Images
    // ==========================

    if (product.variants?.length) {
      for (const variant of product.variants) {
        if (variant.images?.length) {
          for (const image of variant.images) {
            try {
              await cloudinary.uploader.destroy(image.public_id);
            } catch (err) {
              console.log("Variant Image Delete Error:", err.message);
            }
          }
        }
      }
    }

    // ==========================
    // Delete Product From MongoDB
    // ==========================

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ➤ Add Category
const addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        response: "failed",
        message: "Category is required",
      });
    }

    const uploadedImages = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newCategory = await ProductCategory.create({
      category,
      images: uploadedImages,
    });

    res.status(201).json({
      response: "success",
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
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
    const category = await ProductCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      response: "success",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};
//update category

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, oldImages } = req.body;

    const existingCategory = await ProductCategory.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        response: "failed",
        message: "Category not found",
      });
    }

    let images = [];

    if (oldImages) {
      try {
        images = JSON.parse(oldImages);
      } catch (err) {
        images = [];
      }
    }

    // Upload new images
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Delete removed Cloudinary images
    const removedImages = existingCategory.images.filter(
      (img) =>
        !images.some((i) => i.public_id && i.public_id === img.public_id),
    );

    for (const image of removedImages) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error(
            "Cloudinary delete failed:",
            image.public_id,
            err.message,
          );
        }
      }
    }

    existingCategory.category = category || existingCategory.category;

    existingCategory.images = images;

    await existingCategory.save();

    res.json({
      response: "success",
      message: "Category updated successfully",
      data: existingCategory,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ➤ Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        response: "failed",
        message: "Category not found",
      });
    }

    for (const image of category.images) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error(
            "Cloudinary delete failed:",
            image.public_id,
            err.message,
          );
        }
      }
    }

    await category.deleteOne();

    res.json({
      response: "success",
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ➤ Add Sub Category
const addSubCategory = async (req, res) => {
  try {
    const { sub_category, category_id } = req.body;

    if (!sub_category || !category_id) {
      return res.status(400).json({
        response: "failed",
        message: "Sub-category name and category_id are required",
      });
    }

    const existingSubCategory = await ProductSubCategory.findOne({
      sub_category,
    });

    if (existingSubCategory) {
      return res.status(400).json({
        response: "failed",
        message: "Sub-category already exists",
      });
    }

    const uploadedImages = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newSubCategory = await ProductSubCategory.create({
      sub_category,
      category_id,
      images: uploadedImages,
    });

    res.status(201).json({
      response: "success",
      message: "Sub-category added successfully",
      data: newSubCategory,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ➤ Get All Sub Categories
const getSubCategories = async (req, res) => {
  try {
    const sub_categories = await ProductSubCategory.find()
      .populate("category_id", "category")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: "Categories retrieved successfully",
      response: "success",
      data: sub_categories,
    });
  } catch (err) {
    console.error("GET SUB CATEGORIES ERROR:", err);

    res.status(500).json({
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

    const sub_category = await ProductSubCategory.findById(id).populate(
      "category_id",
      "category",
    );

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
    console.error("GET SUB CATEGORY ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Update sub_category
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { sub_category, category_id, oldImages } = req.body;

    const existingSubCategory = await ProductSubCategory.findById(id);

    if (!existingSubCategory) {
      return res.status(404).json({
        response: "failed",
        message: "Sub-category not found",
      });
    }

    let images = [];

    if (oldImages) {
      try {
        images = JSON.parse(oldImages);
      } catch {
        images = [];
      }
    }

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const removedImages = existingSubCategory.images.filter(
      (img) =>
        !images.some((i) => i.public_id && i.public_id === img.public_id),
    );

    for (const image of removedImages) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }
    }

    existingSubCategory.sub_category =
      sub_category || existingSubCategory.sub_category;

    existingSubCategory.category_id =
      category_id || existingSubCategory.category_id;

    existingSubCategory.images = images;

    await existingSubCategory.save();

    res.status(200).json({
      response: "success",
      message: "Sub-category updated successfully",
      data: existingSubCategory,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ➤ Delete sub_category
const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await ProductSubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        response: "failed",
        message: "Sub-category not found",
      });
    }

    for (const image of subCategory.images) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error("Cloudinary delete error:", err.message);
        }
      }
    }

    await subCategory.deleteOne();

    res.status(200).json({
      response: "success",
      message: "Sub-category deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// Get All Contact Us Entries
const getAllContactUs = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      response: "success",
      message: "All contact submissions fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({
      response: "failed",
      message: "Server Error",
      error: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      read: false,
    });

    res.status(200).json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, {
      read: true,
    });

    res.status(200).json({
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating notification",
      error: error.message,
    });
  }
};

const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating notifications",
      error: error.message,
    });
  }
};

const createTestNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      title: "Test Notification",
      message: "Notification system working",
      type: "system",
    });

    // 🔥 Real Time Emit
    const io = getIO();

    io.emit("new-notification", notification);

    res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating notification",
      error: error.message,
    });
  }
};

// ----------------------------------------
// Create Discount
// ----------------------------------------
const createDiscount = async (req, res) => {
  console.log("🔥 CREATE DISCOUNT HIT");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  try {
    const discount = new Discount(req.body);
    await discount.save();

    res.status(201).json({
      message: "Discount created successfully",
      data: discount,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating discount",
      error: error.message,
    });
  }
};

// ----------------------------------------
// Get All Discounts
// ----------------------------------------
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Discounts fetched successfully",
      data: discounts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching discounts",
      error: error.message,
    });
  }
};

// ----------------------------------------
// Get Discount By Id
// ----------------------------------------
const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;

    const discount = await Discount.findById(id);
    if (!discount) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    res.status(200).json({
      message: "Discount fetched successfully",
      data: discount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching discount",
      error: error.message,
    });
  }
};

// ----------------------------------------
// Update Discount
// ----------------------------------------
const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Discount.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    res.status(200).json({
      message: "Discount updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating discount",
      error: error.message,
    });
  }
};

// ----------------------------------------
// Delete Discount
// ----------------------------------------
const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Discount.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Discount not found",
      });
    }

    res.status(200).json({
      message: "Discount deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting discount",
      error: error.message,
    });
  }
};

// get Order by Id
//
// ---------------- GET ORDER BY ID ----------------
//
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", response: "failed" });
    }

    res.status(200).json({ message: "Data Found", response: "success", order });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Server Error", response: "failed" });
  }
};

// Update Only Delivery Status

const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      deliveryStatus,
      trackingId,
      courierName,
      expectedDelivery,
      rtoReason,
    } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "RTO Initiated",
      "RTO In Transit",
      "RTO Delivered",
    ];

    if (!deliveryStatus) {
      return res.status(400).json({
        response: "failed",
        message: "Delivery status is required",
      });
    }

    if (!validStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        response: "failed",
        message: "Invalid delivery status",
      });
    }

    // Tracking details required for shipped orders

    if (["Shipped", "Out for Delivery"].includes(deliveryStatus)) {
      if (!trackingId || !courierName) {
        return res.status(400).json({
          response: "failed",
          message: "Courier name and Tracking ID are required.",
        });
      }
    }

    // RTO reason required

    if (
      ["RTO Initiated", "RTO In Transit", "RTO Delivered"].includes(
        deliveryStatus,
      )
    ) {
      if (!rtoReason) {
        return res.status(400).json({
          response: "failed",
          message: "RTO Reason is required.",
        });
      }
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        response: "failed",
        message: "Order not found",
      });
    }

    const allowedTransitions = {
      Pending: ["Processing", "Cancelled"],
      Processing: ["Packed", "Cancelled"],
      Packed: ["Shipped", "Cancelled"],
      Shipped: ["Out for Delivery", "RTO Initiated"],
      "Out for Delivery": ["Delivered", "RTO Initiated"],
      Delivered: [],
      Cancelled: [],
      "RTO Initiated": ["RTO In Transit"],
      "RTO In Transit": ["RTO Delivered"],
      "RTO Delivered": [],
    };

    const currentStatus = order.deliveryStatus;

    if (
      currentStatus !== deliveryStatus &&
      !allowedTransitions[currentStatus]?.includes(deliveryStatus)
    ) {
      return res.status(400).json({
        response: "failed",
        message: `Cannot change status from "${currentStatus}" to "${deliveryStatus}"`,
      });
    }

    // ========= RTO STOCK RESTORE =========
    if (deliveryStatus === "RTO Delivered" && order.restockDone === false) {
      for (const item of order.items) {

        // ================= Combo Item =================
        if (item.type === "combo") {
          for (const cp of item.comboProducts) {
            const restoreQty = cp.quantity * item.quantity;

            if (cp.variant_id) {
              await Product.findOneAndUpdate(
                {
                  _id: cp.product_id,
                  "variants._id": cp.variant_id,
                },
                {
                  $inc: {
                    "variants.$.quantity": restoreQty,
                  },
                }
              );
            } else {
              await Product.findByIdAndUpdate(cp.product_id, {
                $inc: {
                  quantity: restoreQty,
                },
              });
            }
          }
          continue;
        }

        // ================= Variant Product =================
        if (item.isVariant && item.variant_id) {
          await Product.findOneAndUpdate(
            {
              _id: item.product_id,
              "variants._id": item.variant_id,
            },
            {
              $inc: {
                "variants.$.quantity": item.quantity,
              },
            },
          );
        }

        // ================= Normal Product =================
        else {
          await Product.findByIdAndUpdate(item.product_id, {
            $inc: {
              quantity: item.quantity,
            },
          });
        }
      }

      order.restockDone = true;
    }

    // ================= Tracking Details =================

    if (trackingId !== undefined) {
      order.trackingId = trackingId;
    }

    if (courierName !== undefined) {
      order.courierName = courierName;
    }

    if (expectedDelivery) {
      order.expectedDelivery = expectedDelivery;
    }

    if (rtoReason !== undefined) {
      order.rtoReason = rtoReason;
    }

    // ================= Update Current Status =================

    order.deliveryStatus = deliveryStatus;

    if (deliveryStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    if (deliveryStatus === "Cancelled") {
      order.cancelledAt = new Date();
    }

    if (deliveryStatus === "RTO Delivered") {
      order.rtoCompletedAt = new Date();
    }

    // Timeline create if not exists
    if (!order.deliveryTimeline) {
      order.deliveryTimeline = [];
    }

    // Friendly messages
    const statusMessages = Object.freeze({
      Pending: "Order has been placed.",
      Processing: "Order is being processed.",
      Packed: "Your order has been packed.",
      Shipped: "Order has been shipped.",
      "Out for Delivery": "Delivery partner is on the way.",
      Delivered: "Order delivered successfully.",
      Cancelled: "Order has been cancelled.",
      "RTO Initiated": "Return process has started.",
      "RTO In Transit": "Order is returning to warehouse.",
      "RTO Delivered": "Returned order received in warehouse.",
    });

    // Prevent duplicate timeline entry
    const lastStatus =
      order.deliveryTimeline.length > 0
        ? order.deliveryTimeline[order.deliveryTimeline.length - 1].status
        : null;

    if (lastStatus !== deliveryStatus) {
      order.deliveryTimeline.push({
        status: deliveryStatus,
        message: statusMessages[deliveryStatus] || deliveryStatus,
        date: new Date(),
      });
    }

    await order.save();

    return res.status(200).json({
      response: "success",
      message: "Delivery status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      response: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add new Carousel
const addCarousel = async (req, res) => {
  try {
    const { title, description, buttonText, link, caption } = req.body;

    if (!title || !link) {
      return res.status(400).json({
        response: "failed",
        message: "Title & Link required",
      });
    }

    const uploadedImages = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const carousel = await Carousel.create({
      title,
      description,
      buttonText,
      link,
      caption,
      images: uploadedImages,
    });

    res.status(201).json({
      response: "success",
      message: "Carousel added successfully",
      carousel,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// Get Carousel by ID
const getCarouselById = async (req, res) => {
  try {
    const { id } = req.params;

    const carousel = await Carousel.findById(id);

    // If not found
    if (!carousel) {
      return res.status(404).json({
        message: "Carousel not found",
        response: "failed",
        carousel: null,
      });
    }

    // Success
    res.status(200).json({
      message: "Carousel retrieved successfully",
      response: "success",
      carousel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch Carousel",
      response: "failed",
      error: err.message,
    });
  }
};

// Update Carousel Controller
const updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, buttonText, link, caption, existingImages } =
      req.body;

    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).json({
        response: "failed",
        message: "Carousel not found",
      });
    }

    let images = [];

    if (existingImages) {
      try {
        images = JSON.parse(existingImages);
      } catch (err) {
        images = [];
      }
    }

    // Upload new images
    if (req.files?.length) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Delete removed images
    const removedImages = carousel.images.filter(
      (img) =>
        !images.some((i) => i.public_id && i.public_id === img.public_id),
    );

    for (const image of removedImages) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error(
            "Cloudinary delete failed:",
            image.public_id,
            err.message,
          );
        }
      }
    }

    carousel.title = title || carousel.title;
    carousel.description = description || carousel.description;
    carousel.buttonText = buttonText || carousel.buttonText;
    carousel.link = link || carousel.link;
    carousel.caption = caption || carousel.caption;
    carousel.images = images;

    await carousel.save();

    res.json({
      response: "success",
      message: "Carousel updated successfully",
      carousel,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

const getAllCarousel = async (req, res) => {
  try {
    const carousels = await Carousel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All carousels fetched successfully",
      response: "success",
      carousels,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch carousels",
      response: "failed",
      error: err.message,
    });
  }
};

// Delete Carousel by ID (and remove image from /uploads/product)
const deleteCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        response: "failed",
        message: "Carousel not found",
      });
    }

    for (const image of carousel.images) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error(
            "Cloudinary delete failed:",
            image.public_id,
            err.message,
          );
        }
      }
    }

    await carousel.deleteOne();

    res.json({
      response: "success",
      message: "Carousel deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};



// ================= ADD BANNER =================
const addBanner = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      topText,
      leftOffer,
      leftText,
      leftCode,
      rightOffer,
      rightText,
      rightCode,
      features,
      buttonText,
      link,
      displayOrder,
    } = req.body;

    if (!title || !link) {
      return res.status(400).json({
        response: "failed",
        message: "Title & Link required",
      });
    }

    let image = null;

    if (req.files?.length) {
      const result = await uploadToCloudinary(req.files[0].buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const banner = await Banner.create({
      title,
      subtitle,
      description,
      topText,
      leftOffer,
      leftText,
      leftCode,
      rightOffer,
      rightText,
      rightCode,
      features: features ? JSON.parse(features) : [],
      buttonText,
      link,
      displayOrder,
      image,
    });

    res.status(201).json({
      response: "success",
      message: "Banner added successfully",
      banner,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= GET ALL =================
const getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      response: "success",
      message: "Banners retrieved successfully",
      banners,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= GET BY ID =================
const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        response: "failed",
        message: "Banner not found",
      });
    }

    res.status(200).json({
      response: "success",
      message: "Banner retrieved successfully",
      banner,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= UPDATE =================
const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      subtitle,
      description,
      topText,
      leftOffer,
      leftText,
      leftCode,
      rightOffer,
      rightText,
      rightCode,
      features,
      buttonText,
      link,
      displayOrder,
      existingImage,
    } = req.body;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({
        response: "failed",
        message: "Banner not found",
      });
    }

    let image = banner.image;

    if (existingImage) {
      image = JSON.parse(existingImage);
    }

    if (req.files?.length) {
      if (banner.image?.public_id) {
        try {
          await cloudinary.uploader.destroy(banner.image.public_id);
        } catch (err) {
          console.log(err);
        }
      }

      const result = await uploadToCloudinary(req.files[0].buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    banner.title = title || banner.title;
    banner.subtitle = subtitle || banner.subtitle;
    banner.description = description || banner.description;
    banner.topText = topText || banner.topText;
    banner.leftOffer = leftOffer || banner.leftOffer;
    banner.leftText = leftText || banner.leftText;
    banner.leftCode = leftCode || banner.leftCode;
    banner.rightOffer = rightOffer || banner.rightOffer;
    banner.rightText = rightText || banner.rightText;
    banner.rightCode = rightCode || banner.rightCode;
    banner.features = features
      ? JSON.parse(features)
      : banner.features;
    banner.buttonText = buttonText || banner.buttonText;
    banner.link = link || banner.link;
    banner.displayOrder = displayOrder ?? banner.displayOrder;
    banner.image = image;

    await banner.save();

    res.status(200).json({
      response: "success",
      message: "Banner updated successfully",
      banner,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= DELETE =================
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        response: "failed",
        message: "Banner not found",
      });
    }

    if (banner.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(banner.image.public_id);
      } catch (err) {
        console.log(err);
      }
    }

    await banner.deleteOne();

    res.status(200).json({
      response: "success",
      message: "Banner deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};



// ================= ADD COLLECTION =================
const addCollection = async (req, res) => {
  try {
    const { name, slug, description, isActive, isFeatured, sortOrder } =
      req.body;

    if (!name || !slug) {
      return res.status(400).json({
        response: "failed",
        message: "Name & Slug required",
      });
    }

    const existing = await Collection.findOne({ slug });

    if (existing) {
      return res.status(400).json({
        response: "failed",
        message: "Slug already exists",
      });
    }

    let image = null;
    let thumbnail = null;

    if (req.files?.[0]) {
      const result = await uploadToCloudinary(req.files[0].buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.[1]) {
      const result = await uploadToCloudinary(req.files[1].buffer);

      thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const collection = await Collection.create({
      name,
      slug,
      description,
      isActive,
      isFeatured,
      sortOrder,
      image,
      thumbnail,
    });

    res.status(201).json({
      response: "success",
      message: "Collection created successfully",
      collection,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= GET COLLECTION BY ID =================
const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

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
      message: "Failed to fetch Collection",
      error: err.message,
    });
  }
};

// ================= UPDATE COLLECTION =================
const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      slug,
      description,
      isActive,
      isFeatured,
      sortOrder,
      oldImage,
      oldThumbnail,
    } = req.body;

    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        response: "failed",
        message: "Collection not found",
      });
    }

    if (name) collection.name = name;
    if (slug) collection.slug = slug;
    if (description) collection.description = description;

    if (typeof isActive !== "undefined") collection.isActive = isActive;

    if (typeof isFeatured !== "undefined") collection.isFeatured = isFeatured;

    if (sortOrder !== undefined) collection.sortOrder = sortOrder;

    let image = oldImage ? JSON.parse(oldImage) : collection.image;

    let thumbnail = oldThumbnail
      ? JSON.parse(oldThumbnail)
      : collection.thumbnail;

    // IMAGE

    if (req.files?.[0]) {
      if (collection.image?.public_id) {
        await cloudinary.uploader.destroy(collection.image.public_id);
      }

      const result = await uploadToCloudinary(req.files[0].buffer);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // THUMBNAIL

    if (req.files?.[1]) {
      if (collection.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(collection.thumbnail.public_id);
      }

      const result = await uploadToCloudinary(req.files[1].buffer);

      thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    collection.image = image;
    collection.thumbnail = thumbnail;

    await collection.save();

    res.json({
      response: "success",
      message: "Collection updated successfully",
      collection,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= GET ALL COLLECTIONS =================
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({
      sortOrder: 1,
    });

    res.json({
      response: "success",
      collections,
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// ================= DELETE COLLECTION =================
const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        response: "failed",
        message: "Collection not found",
      });
    }

    if (collection.image?.public_id) {
      await cloudinary.uploader.destroy(collection.image.public_id);
    }

    if (collection.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(collection.thumbnail.public_id);
    }

    await collection.deleteOne();

    res.json({
      response: "success",
      message: "Collection deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      response: "failed",
      message: err.message,
    });
  }
};

// EXPORT (same style as your project)

// Add new Reel
const addReel = async (req, res) => {
  try {
    const { title, link } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        message: "Title required.",
        response: "failed",
      });
    }

    // Handle uploaded images (via multer)
    const imageFiles = req.files || []; // 'images' matches your multer field name
    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`,
    );

    // Create new Carousel
    const newReel = new Reel({
      title,
      link,
      images: imagePaths,
    });

    // Save to DB
    await newReel.save();

    res.status(201).json({
      message: "Reel added successfully",
      response: "success",
      reel: newReel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add Reel",
      response: "failed",
      error: err.message,
    });
  }
};

// Get Reel by ID
const getReelById = async (req, res) => {
  try {
    const { id } = req.params;

    const reel = await Reel.findById(id);

    // If not found
    if (!reel) {
      return res.status(404).json({
        message: "Reel not found",
        response: "failed",
        reel: null,
      });
    }

    // Success
    res.status(200).json({
      message: "Reel retrieved successfully",
      response: "success",
      carousel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch Reel",
      response: "failed",
      error: err.message,
    });
  }
};

// Update Reel Controller
const updateReel = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link } = req.body;

    // Find carousel
    const reel = await Reel.findById(id);
    if (!reel) {
      return res.status(404).json({
        message: "Reel not found",
        response: "failed",
      });
    }

    // Update text fields
    if (title !== undefined) reel.title = title;
    if (link !== undefined) reel.link = link;

    // Handle NEW uploaded images
    const imageFiles = req.files || [];
    const newImagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`,
    );

    // Handle EXISTING images (sent from frontend as JSON array)
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (err) {
        console.error("Invalid existingImages JSON:", err);
        existingImages = [];
      }
    }

    // Final images = existing (not removed) + new ones
    reel.images = [...existingImages, ...newImagePaths];

    // Save
    const updatedReel = await reel.save();

    res.status(200).json({
      message: "Reel updated successfully",
      response: "success",
      reel: updatedReel,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update Reel",
      response: "failed",
      error: err.message,
    });
  }
};

// Delete Reel by ID (and remove image from /uploads/product)
const deleteReel = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the carousel first
    const reel = await Reel.findById(id);
    if (!reel) {
      return res.status(404).json({
        message: "Reel not found",
        response: "failed",
      });
    }

    // Remove image from /uploads/product folder
    if (reel.images && reel.images[0]) {
      const imagePath = path.join(
        process.cwd(),
        "uploads/product", // adjust if your upload folder is different
        path.basename(reel.images[0]),
      );

      // Check if file exists, then delete
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete carousel from database
    await Reel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Reel deleted successfully",
      response: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete Reel",
      response: "failed",
      error: err.message,
    });
  }
};

// Get All Subscribers
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribe.find().sort({ createdAt: -1 });

    res.status(200).json({
      response: "success",
      data: subscribers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "failed", message: "Server error" });
  }
};

module.exports = {
  getUsers,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getAllContactUs,
  createDiscount,
  updateDiscount,
  getAllDiscounts,
  getDiscountById,
  deleteDiscount,
  getOrderById,
  updateDeliveryStatus,
  addCarousel,
  getCarouselById,
  updateCarousel,
  getAllCarousel,
  deleteCarousel,
  addReel,
  getReelById,
  updateReel,
  deleteReel,
  updateProductTag,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createTestNotification,
  getAllSubscribers,
  addCollection,
  getCollectionById,
  updateCollection,
  getAllCollections,
  deleteCollection,
  addBanner,
  getAllBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
   addCombo,
  updateCombo,
  getAllCombos,
  getComboById,
  deleteCombo,
};
