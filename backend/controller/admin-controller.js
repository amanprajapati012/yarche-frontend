const ContactUs = require("../models/contactUsModel");
const ProductCategory = require("../models/productCategoryModel");
const Product = require("../models/productModel");
const ProductSubCategory = require("../models/productSubCategoryModel");
const User = require("../models/userModel");
const Discount = require("../models/discountModel");
const Order = require("../models/orderModel");
const Carousel = require("../models/carouselModel")
const Subscribe = require("../models/subscribeModel");
// Delete Crousel by ID
const fs = require("fs");
const path = require("path");
const Reel = require("../models/reelModels");
const Notification = require("../models/Notification");
const Collection = require("../models/CollectionModel");

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

    const parsedVariants =
      variants
        ? typeof variants === "string"
          ? JSON.parse(variants)
          : variants
        : [];

    const parsedTags =
      tags
        ? typeof tags === "string"
          ? JSON.parse(tags)
          : tags
        : [];

    const files = req.files || [];

    const productImages = files
      .filter(
        (file) =>
          file.fieldname === "productImages"
      )
      .map(
        (file) =>
          `/uploads/product/${file.filename}`
      );

    const finalVariants =
      parsedVariants.map(
        (variant, index) => {
          const variantImages = files
            .filter(
              (file) =>
                file.fieldname ===
                `variantImages_${index}`
            )
            .map(
              (file) =>
                `/uploads/product/${file.filename}`
            );

          return {
            ...variant,
            images: variantImages,
            useProductImages:
              variantImages.length === 0,
          };
        }
      );

    const product =
      await Product.create({
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


const updateProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
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

    const parsedVariants =
      variants
        ? typeof variants === "string"
          ? JSON.parse(variants)
          : variants
        : [];

    const parsedTags =
      tags
        ? typeof tags === "string"
          ? JSON.parse(tags)
          : tags
        : [];

    const files = req.files || [];

    const existingImages =
      oldImages
        ? JSON.parse(oldImages)
        : [];

    const uploadedProductImages =
      files
        .filter(
          (file) =>
            file.fieldname ===
            "productImages"
        )
        .map(
          (file) =>
            `/uploads/product/${file.filename}`
        );

    const removedImages =
      product.images.filter(
        (img) =>
          !existingImages.includes(img)
      );

    removedImages.forEach((img) => {
      const imagePath = path.join(
        process.cwd(),
        img.replace(
          "/uploads/",
          "uploads/"
        )
      );

      if (
        fs.existsSync(imagePath)
      ) {
        fs.unlinkSync(imagePath);
      }
    });

    product.images = [
      ...existingImages,
      ...uploadedProductImages,
    ];

    product.variants =
      parsedVariants.map(
        (variant, index) => {
          const uploadedVariantImages =
            files
              .filter(
                (file) =>
                  file.fieldname ===
                  `variantImages_${index}`
              )
              .map(
                (file) =>
                  `/uploads/product/${file.filename}`
              );

          const finalImages =
            uploadedVariantImages.length >
            0
              ? uploadedVariantImages
              : variant.images || [];

          return {
            ...variant,
            images: finalImages,
            useProductImages:
              finalImages.length === 0,
          };
        }
      );

    product.productSku =
      productSku;
    product.name = name;
    product.title = title;
    product.description =
      description;
    product.full_description =
      full_description;
    product.category =
      category;
    product.sub_category =
      sub_category;

    product.price = price;
    product.discountedPrice =
      discountedPrice;
    product.landingPrice =
      landingPrice;
    product.quantity =
      quantity;

    product.tags = parsedTags;

    await product.save();

    return res.json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateProductTag = async (
  req,
  res
) => {
  const { id } = req.params;

  const { tag, checked } =
    req.body;

  const product =
    await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (checked) {
    if (
      !product.tags.includes(tag)
    ) {
      product.tags.push(tag);
    }
  } else {
    product.tags =
      product.tags.filter(
        (item) => item !== tag
      );
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
        message: "Product not found",
        response: "failed",
      });
    }

    // Main product images delete
    product.images.forEach((img) => {
      const imagePath = path.join(
        process.cwd(),
        "uploads/product",
        path.basename(img)
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Variant images delete
    product.variants?.forEach((variant) => {
      variant.images?.forEach((img) => {
        const imagePath = path.join(
          process.cwd(),
          "uploads/product",
          path.basename(img)
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
      response: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete product",
      response: "failed",
      error: err.message,
    });
  }
};





// ➤ Add Category
const addCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        response: "failed",
      });
    }

     // Handle uploaded images from multer
    const imageFiles = req.files || [];
    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    const newCategory = new ProductCategory({ category : category, images: imagePaths });
    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
      response: "success",
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
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

// ➤ Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    // Find existing subcategory
    const existingCategory = await ProductCategory.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
        response: "failed",
      });
    }

    // Handle uploaded images
    const imageFiles = req.files || [];
    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    // Prepare update data
    const updateData = {};
    if (category) updateData.category = category;

    // If new images uploaded, replace; otherwise keep old ones
    updateData.images =
      imagePaths.length > 0 ? imagePaths : existingCategory.images;

    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  
    res.status(200).json({
      message: "Category updated successfully",
      response: "success",
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await ProductCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      response: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Add Sub Category
const addSubCategory = async (req, res) => {
  try {
    const { sub_category, category_id, } = req.body;

    // Validate inputs
    if (!sub_category || !category_id) {
      return res.status(400).json({
        message: "Sub-category name and category_id are required",
        response: "failed",
      });
    }

    // Handle uploaded images from multer
    const imageFiles = req.files || [];
    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    // Check if subcategory already exists (optional but recommended)
    const existingSubCategory = await ProductSubCategory.findOne({
      sub_category,
    });
    if (existingSubCategory) {
      return res.status(400).json({
        message: "Sub-category already exists",
        response: "failed",
      });
    }

    // Create and save new subcategory
    const newSubCategory = new ProductSubCategory({
      sub_category,
      category_id,
      images: imagePaths,
    });

    await newSubCategory.save();

    res.status(201).json({
      message: "Sub-category added successfully",
      response: "success",
      data: newSubCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Get All Sub Categories
const getSubCategories = async (req, res) => {
  try {
    
    const sub_categories = await ProductSubCategory.find().sort({
      createdAt: -1,
    });

    if (!sub_categories || sub_categories.length === 0) {
      return res.status(404).json({
        message: "No categories found",
        response: "failed",
        data: [],
      });
    }

    res.status(200).json({
      message: "Categories retrieved successfully",
      response: "success",
      data: sub_categories,
    });
  } catch (err) {
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

// ➤ Update sub_category
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { sub_category, category_id, } = req.body;

    // Find existing subcategory
    const existingSubCategory = await ProductSubCategory.findById(id);
    if (!existingSubCategory) {
      return res.status(404).json({
        message: "Sub-category not found",
        response: "failed",
      });
    }

    // Handle uploaded images
    const imageFiles = req.files || [];
    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    // Prepare update data
    const updateData = {};
    if (sub_category) updateData.sub_category = sub_category;
    if (category_id) updateData.category_id = category_id;

    // If new images uploaded, replace; otherwise keep old ones
    updateData.images =
      imagePaths.length > 0 ? imagePaths : existingSubCategory.images;

    // Update document
    const updatedSubCategory = await ProductSubCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Sub-category updated successfully",
      response: "success",
      data: updatedSubCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
    });
  }
};

// ➤ Delete sub_category
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedsub_category = await ProductSubCategory.findByIdAndDelete(id);

    if (!deletedsub_category) {
      return res.status(404).json({
        message: "Category not found",
        response: "failed",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      response: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
      response: "failed",
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
    await Notification.updateMany(
      { read: false },
      { read: true }
    );

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
      return res.status(404).json({ message: "Order not found", response : "failed" });
    }

    res.status(200).json({message: "Data Found", response : "success", order});
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({ message: "Server Error", response : "failed" });
  }
};


// Update Only Delivery Status

const updateDeliveryStatus = async (req, res) => {
  
  try {
    const {orderId} = req.params;
    const { deliveryStatus } = req.body;

    // Validate input
    if (!deliveryStatus) {
      return res.status(400).json({
        message: "deliveryStatus is required",
        response: "failed"
      });
    }
    
    // Allowed delivery statuses
    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Out_for_delivery",
      "Delivered",
      "Cancelled",
      "Returned"
    ];

    if (!validStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        message: `Invalid deliveryStatus. Allowed: ${validStatuses.join(", ")}`,
        response: "failed"
      });
    }

    // Update status only
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { deliveryStatus },
      { new: true }
    );


    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        response: "failed"
      });
    }

    return res.json({
      message: "Delivery status updated successfully",
      response: "success",
      order: updatedOrder
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: "failed",
      error: error.message
    });
  }
};

// Add new Carousel
const addCarousel = async (req, res) => {
  try {
    const { title, description, buttonText, link, caption } = req.body;

    if (!title || !link) {
      return res.status(400).json({
        message: "Title & Link required",
        response: "failed",
      });
    }

    const imageFiles = req.files || [];

    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    const newCarousel = new Carousel({
      title,
      description,
      buttonText,
      link,
      caption,
      images: imagePaths,
    });

    await newCarousel.save();

    res.status(201).json({
      message: "Carousel added successfully",
      response: "success",
      carousel: newCarousel,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to add Carousel",
      error: err.message,
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
    const { title, description, buttonText, link, caption } = req.body;

    const carousel = await Carousel.findById(id);

    if (!carousel) {
      return res.status(404).json({
        message: "Carousel not found",
      });
    }

    if (title) carousel.title = title;
    if (description) carousel.description = description;
    if (buttonText) carousel.buttonText = buttonText;
    if (link) carousel.link = link;
    if (caption) carousel.caption = caption;

    /* NEW IMAGES */
    const imageFiles = req.files || [];
    const newImages = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    /* EXISTING IMAGES */
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch {
        existingImages = [];
      }
    }

    carousel.images = [...existingImages, ...newImages];

    const updated = await carousel.save();

    res.status(200).json({
      message: "Carousel updated",
      carousel: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
      error: err.message,
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
    const { id } = req.params;

    // Find the carousel first
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(404).json({
        message: "Carousel not found",
        response: "failed",
      });
    }

    // Remove image from /uploads/product folder
    if (carousel.images && carousel.images[0]) {
      const imagePath = path.join(
        process.cwd(),
        "uploads/product", // adjust if your upload folder is different
        path.basename(carousel.images[0])
      );

      // Check if file exists, then delete
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete carousel from database
    await Carousel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Carousel deleted successfully",
      response: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete Carousel",
      response: "failed",
      error: err.message,
    });
  }
};




// ================= ADD COLLECTION =================
const addCollection = async (req, res) => {
  try {
    const { name, slug, description, isActive, isFeatured, sortOrder } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name & Slug required",
        response: "failed",
      });
    }

    const existing = await Collection.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        message: "Slug already exists",
        response: "failed",
      });
    }

    const imageFiles = req.files || [];

    const imagePaths = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    const collection = new Collection({
      name,
      slug,
      description,
      isActive,
      isFeatured,
      sortOrder,
      image: imagePaths[0] || "",
      thumbnail: imagePaths[1] || "",
    });

    await collection.save();

    res.status(201).json({
      message: "Collection created successfully",
      response: "success",
      collection,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create Collection",
      error: err.message,
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
    const { name, slug, description, isActive, isFeatured, sortOrder } = req.body;

    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        response: "failed",
      });
    }

    if (name) collection.name = name;
    if (slug) collection.slug = slug;
    if (description) collection.description = description;
    if (typeof isActive !== "undefined") collection.isActive = isActive;
    if (typeof isFeatured !== "undefined") collection.isFeatured = isFeatured;
    if (sortOrder !== undefined) collection.sortOrder = sortOrder;

    // NEW IMAGES
    const imageFiles = req.files || [];
    const newImages = imageFiles.map(
      (file) => `/uploads/product/${file.filename}`
    );

    // EXISTING IMAGES
    let existingImage = req.body.existingImage || collection.image;

    if (newImages.length > 0) {
      existingImage = newImages[0];
    }

    collection.image = existingImage;

    const updated = await collection.save();

    res.status(200).json({
      message: "Collection updated successfully",
      response: "success",
      collection: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update Collection",
      error: err.message,
    });
  }
};

// ================= GET ALL COLLECTIONS =================
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().sort({ sortOrder: 1 });

    res.status(200).json({
      message: "All collections fetched successfully",
      response: "success",
      collections,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch collections",
      error: err.message,
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
        message: "Collection not found",
        response: "failed",
      });
    }

    await Collection.findByIdAndDelete(id);

    res.status(200).json({
      message: "Collection deleted successfully",
      response: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete Collection",
      error: err.message,
    });
  }
};

// EXPORT (same style as your project)


// Add new Reel
const addReel = async (req, res) => {
  try {
    const { title, link,} = req.body;

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
      (file) => `/uploads/product/${file.filename}`
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

    const reel = await Reel
    .findById(id);

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
    const { title, link} = req.body;

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
      (file) => `/uploads/product/${file.filename}`
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
        path.basename(reel.images[0])
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
};
