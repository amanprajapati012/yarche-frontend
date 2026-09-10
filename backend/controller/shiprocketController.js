const {
  shiprocketLogin,
  checkServiceability,
  createShiprocketOrder,
  assignAWB,
  generatePickup,
  generateLabel,
  generateManifest,
  trackAWB,
  cancelOrder,
  getPickupLocations,
  addPickupLocation,
} = require("../services/shiprocketService");

// =====================================================
// SHIPROCKET AUTH
// =====================================================

const shiprocketAuth = async (req, res) => {
  try {
    const data = await shiprocketLogin();

    return res.status(200).json({
      success: true,
      message: "Shiprocket authentication successful",
      data: {
        company_id: data.company_id,
        email: data.email,
        id: data.id,
        created_at: data.created_at,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });
  } catch (error) {
    console.error(
      "SHIPROCKET AUTH CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Shiprocket authentication failed",
      error:
        error.response?.data ||
        error.message,
    });
  }
};

// =====================================================
// COURIER SERVICEABILITY
// =====================================================

const shiprocketServiceability = async (
  req,
  res
) => {
  try {
    const {
      delivery_postcode,
      cod = 0,
      weight = 0.5,
      length,
      breadth,
      height,
    } = req.body;

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!delivery_postcode) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery postcode is required",
      });
    }

    if (
      !/^\d{6}$/.test(
        String(delivery_postcode)
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery postcode must be a valid 6 digit pincode",
      });
    }

    // -----------------------------------------
    // Pickup Pincode 
    // -----------------------------------------

    const pickup_postcode =
      process.env.SHIPROCKET_PICKUP_PINCODE;

    if (!pickup_postcode) {
      return res.status(500).json({
        success: false,
        message:
          "SHIPROCKET_PICKUP_PINCODE is missing in .env",
      });
    }

    // -----------------------------------------
    // Shiprocket API
    // -----------------------------------------

    const data =
      await checkServiceability({
        pickup_postcode,
        delivery_postcode,
        cod: cod ? 1 : 0,
        weight,
        length,
        breadth,
        height,
      });

    return res.status(200).json({
      success: true,
      message:
        "Courier serviceability fetched successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET SERVICEABILITY CONTROLLER ERROR:",
      error.response?.data ||
        error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to check courier serviceability",
      error:
        error.response?.data ||
        error.message,
    });
  }
};

// =====================================================
// CREATE SHIPROCKET ORDER
// =====================================================

const createShiprocketOrderController = async (req, res) => {
  try {
    const {
      order_id,
      order_date,
      pickup_location,
      billing_customer_name,
      billing_last_name,
      billing_address,
      billing_address_2,
      billing_city,
      billing_pincode,
      billing_state,
      billing_country,
      billing_email,
      billing_phone,
      shipping_is_billing,
      shipping_customer_name,
      shipping_last_name,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_pincode,
      shipping_state,
      shipping_country,
      shipping_email,
      shipping_phone,
      order_items,
      payment_method,
      sub_total,
      length,
      breadth,
      height,
      weight,
    } = req.body;

    // ================= VALIDATION =================

    if (!order_id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!pickup_location) {
      return res.status(400).json({
        success: false,
        message: "Pickup location is required",
      });
    }

    if (!billing_customer_name) {
      return res.status(400).json({
        success: false,
        message: "Billing customer name is required",
      });
    }

    if (!billing_address) {
      return res.status(400).json({
        success: false,
        message: "Billing address is required",
      });
    }

    if (!billing_pincode) {
      return res.status(400).json({
        success: false,
        message: "Billing pincode is required",
      });
    }

    if (!order_items || order_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    // ================= SHIPROCKET ORDER DATA =================

    const shiprocketData = {
      order_id,
      order_date: order_date || new Date().toISOString(),
      pickup_location,

      billing_customer_name,
      billing_last_name: billing_last_name || "",
      billing_address,
      billing_address_2: billing_address_2 || "",
      billing_city,
      billing_pincode,
      billing_state,
      billing_country: billing_country || "India",
      billing_email: billing_email || "",
      billing_phone,

      shipping_is_billing:
        shipping_is_billing !== undefined
          ? shipping_is_billing
          : true,

      shipping_customer_name:
        shipping_customer_name || billing_customer_name,

      shipping_last_name:
        shipping_last_name || billing_last_name || "",

      shipping_address:
        shipping_address || billing_address,

      shipping_address_2:
        shipping_address_2 || billing_address_2 || "",

      shipping_city:
        shipping_city || billing_city,

      shipping_pincode:
        shipping_pincode || billing_pincode,

      shipping_state:
        shipping_state || billing_state,

      shipping_country:
        shipping_country || billing_country || "India",

      shipping_email:
        shipping_email || billing_email || "",

      shipping_phone:
        shipping_phone || billing_phone,

      order_items,

      payment_method:
        payment_method || "COD",

      sub_total: Number(sub_total || 0),

      length: Number(length || 10),
      breadth: Number(breadth || 10),
      height: Number(height || 10),
      weight: Number(weight || 0.5),
    };

    // ================= CREATE ORDER =================

    const data = await createShiprocketOrder(shiprocketData);

    return res.status(200).json({
      success: true,
      message: "Shiprocket order created successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET CREATE ORDER CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create Shiprocket order",
      error: error.response?.data || error.message,
    });
  }
};

// ====================================================
// GET PICKUP LOCATIONS
// ====================================================

const shiprocketPickupLocations = async (req, res) => {
  try {
    const data = await getPickupLocations();

    return res.status(200).json({
      success: true,
      message: "Pickup locations fetched successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET PICKUP LOCATIONS CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch pickup locations",
      error: error.response?.data || error.message,
    });
  }
};


// =====================================================
// ADD PICKUP LOCATION
// =====================================================

const shiprocketAddPickupLocation = async (req, res) => {
  try {
    const {
      pickup_location,
      name,
      email,
      phone,
      address,
      address_2,
      city,
      state,
      country,
      pin_code,
    } = req.body;

    if (!pickup_location) {
      return res.status(400).json({
        success: false,
        message: "Pickup location name is required",
      });
    }

    if (!name || !phone || !address || !city || !state || !pin_code) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, address, city, state and pin code are required",
      });
    }

    const data = await addPickupLocation({
      pickup_location,
      name,
      email,
      phone,
      address,
      address_2,
      city,
      state,
      country,
      pin_code,
    });

    return res.status(200).json({
      success: true,
      message: "Pickup location added successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET ADD PICKUP CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to add pickup location",
      error: error.response?.data || error.message,
    });
  }
};

// =====================================================
// ASSIGN AWB / COURIER
// =====================================================

const shiprocketAssignAWB = async (req, res) => {
  try {
    const {
      shipment_id,
      courier_id,
    } = req.body;

    // Validation
    if (!shipment_id) {
      return res.status(400).json({
        success: false,
        message: "Shipment ID is required",
      });
    }

    if (!courier_id) {
      return res.status(400).json({
        success: false,
        message: "Courier ID is required",
      });
    }

    const data = await assignAWB({
      shipment_id,
      courier_id,
    });

    return res.status(200).json({
      success: true,
      message: "Courier assigned and AWB generated successfully",
      data,
    });

  } catch (error) {
    console.error(
      "SHIPROCKET ASSIGN AWB CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to assign courier / generate AWB",
      error:
        error.response?.data ||
        error.message,
    });
  }
};

// =====================================================
// GENERATE PICKUP
// =====================================================

const shiprocketGeneratePickup = async (req, res) => {
  try {
    const { shipment_id } = req.body;

    if (!shipment_id) {
      return res.status(400).json({
        success: false,
        message: "Shipment ID is required",
      });
    }

    const data = await generatePickup(shipment_id);

    return res.status(200).json({
      success: true,
      message: "Pickup generated successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET PICKUP CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate pickup",
      error: error.response?.data || error.message,
    });
  }
};


// =====================================================
// GENERATE LABEL
// =====================================================

const shiprocketGenerateLabel = async (req, res) => {
  try {
    const { shipment_id } = req.body;

    if (!shipment_id) {
      return res.status(400).json({
        success: false,
        message: "Shipment ID is required",
      });
    }

    const data = await generateLabel(shipment_id);

    return res.status(200).json({
      success: true,
      message: "Label generated successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET LABEL CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate label",
      error: error.response?.data || error.message,
    });
  }
};


// =====================================================
// GENERATE MANIFEST
// =====================================================

const shiprocketGenerateManifest = async (req, res) => {
  try {
    const { shipment_id } = req.body;

    if (!shipment_id) {
      return res.status(400).json({
        success: false,
        message: "Shipment ID is required",
      });
    }

    const data = await generateManifest(shipment_id);

    return res.status(200).json({
      success: true,
      message: "Manifest generated successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET MANIFEST CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate manifest",
      error: error.response?.data || error.message,
    });
  }
};

// =====================================================
// TRACK AWB
// =====================================================

const shiprocketTrackAWB = async (req, res) => {
  try {
    const { awb } = req.params;

    if (!awb) {
      return res.status(400).json({
        success: false,
        message: "AWB code is required",
      });
    }

    const data = await trackAWB(awb);

    return res.status(200).json({
      success: true,
      message: "Tracking details fetched successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET TRACKING CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch tracking details",
      error: error.response?.data || error.message,
    });
  }
};

// =====================================================
// CANCEL SHIPROCKET ORDER
// =====================================================

const shiprocketCancelOrder = async (req, res) => {
  try {
    const { shiprocketOrderId } = req.body;

    if (!shiprocketOrderId) {
      return res.status(400).json({
        success: false,
        message: "Shiprocket order ID is required",
      });
    }

    const data = await cancelOrder(shiprocketOrderId);

    return res.status(200).json({
      success: true,
      message: "Shiprocket order cancelled successfully",
      data,
    });
  } catch (error) {
    console.error(
      "SHIPROCKET CANCEL CONTROLLER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to cancel Shiprocket order",
      error: error.response?.data || error.message,
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  shiprocketAuth,
  shiprocketServiceability,
  createShiprocketOrderController,
    shiprocketPickupLocations,
     shiprocketAddPickupLocation,
      shiprocketAssignAWB,
       shiprocketGeneratePickup,
  shiprocketGenerateLabel,
  shiprocketGenerateManifest,
  shiprocketTrackAWB,
  shiprocketCancelOrder,
};