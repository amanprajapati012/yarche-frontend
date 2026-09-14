const axios = require("axios");

const BASE_URL =
  process.env.SHIPROCKET_BASE_URL ||
  "https://apiv2.shiprocket.in/v1/external";

// =====================================================
// TOKEN CACHE
// =====================================================

let shiprocketToken = null;
let tokenExpiresAt = 0;

// =====================================================
// LOGIN - GET NEW TOKEN
// =====================================================

const shiprocketLogin = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data?.token;

    if (!token) {
      throw new Error("Shiprocket token not received");
    }

    // Save token in memory
    shiprocketToken = token;

    // Refresh before actual expiry
    tokenExpiresAt =
      Date.now() + 9 * 24 * 60 * 60 * 1000;

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET LOGIN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// GET TOKEN
// =====================================================

const getShiprocketToken = async () => {
  if (
    shiprocketToken &&
    Date.now() < tokenExpiresAt
  ) {
    return shiprocketToken;
  }

  const data = await shiprocketLogin();

  return data.token;
};

// =====================================================
// AUTH HEADERS
// =====================================================

const getShiprocketHeaders = async () => {
  const token = await getShiprocketToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// =====================================================
// COURIER SERVICEABILITY
// =====================================================

const checkServiceability = async ({
  pickup_postcode,
  delivery_postcode,
  cod = 0,
  weight = 0.5,
  length,
  breadth,
  height,
}) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.get(
      `${BASE_URL}/courier/serviceability/`,
      {
        headers,
        params: {
          pickup_postcode,
          delivery_postcode,
          cod,
          weight,
          length,
          breadth,
          height,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET SERVICEABILITY ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// CREATE ADHOC ORDER
// =====================================================

const createShiprocketOrder = async (orderData) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/orders/create/adhoc`,
      orderData,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET CREATE ORDER ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// ASSIGN AWB / COURIER
// =====================================================

const assignAWB = async ({
  shipment_id,
  courier_id,
}) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/courier/assign/awb`,
      {
        shipment_id,
        courier_id,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET ASSIGN AWB ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// GENERATE PICKUP
// =====================================================

const generatePickup = async (shipment_id) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/courier/generate/pickup`,
      {
        shipment_id: [shipment_id],
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET PICKUP ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// GENERATE LABEL
// =====================================================

const generateLabel = async (shipment_id) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/courier/generate/label`,
      {
        shipment_id: [shipment_id],
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET LABEL ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// GENERATE MANIFEST
// =====================================================

const generateManifest = async (shipment_id) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/manifests/generate`,
      {
        shipment_id: [shipment_id],
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET MANIFEST ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// TRACK AWB
// =====================================================

const trackAWB = async (awb) => {
  try {
    if (!awb) {
      throw new Error("AWB code is required");
    }

    const headers = await getShiprocketHeaders();

    const response = await axios.get(
      `${BASE_URL}/courier/track/awb/${encodeURIComponent(awb)}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET TRACKING ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// CANCEL ORDER
// =====================================================

const cancelOrder = async (shiprocketOrderId) => {
  try {
    if (!shiprocketOrderId) {
      throw new Error(
        "Shiprocket order ID is required"
      );
    }

    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/orders/cancel`,
      {
        ids: [shiprocketOrderId],
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET CANCEL ORDER ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// GET PICKUP LOCATIONS
// =====================================================

const getPickupLocations = async () => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.get(
      `${BASE_URL}/settings/company/pickup`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET PICKUP LOCATIONS ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// =====================================================
// ADD PICKUP LOCATION
// =====================================================

const addPickupLocation = async ({
  pickup_location,
  name,
  email,
  phone,
  address,
  address_2,
  city,
  state,
  country = "India",
  pin_code,
}) => {
  try {
    const headers = await getShiprocketHeaders();

    const response = await axios.post(
      `${BASE_URL}/settings/company/addpickup`,
      {
        pickup_location,
        name,
        email,
        phone,
        address,
        address_2: address_2 || "",
        city,
        state,
        country,
        pin_code,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "SHIPROCKET ADD PICKUP LOCATION ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  shiprocketLogin,
  getShiprocketToken,
  getShiprocketHeaders,

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
};