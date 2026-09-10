const express = require("express");

const router = express.Router();

const {
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
} = require("../controller/shiprocketController");

// =====================================================
// SHIPROCKET AUTH
// =====================================================

router.post(
  "/auth",
  shiprocketAuth
);

// =====================================================
// COURIER SERVICEABILITY---------------
// =====================================================

router.post(
  "/serviceability",
  shiprocketServiceability
);

// =====================================================
// CREATE SHIPROCKET ORDER-------------------
// =====================================================

router.post(
  "/create-order",
  createShiprocketOrderController
);

router.get(
  "/pickup-locations",
  shiprocketPickupLocations
);

router.post(
  "/add-pickup-location",
  shiprocketAddPickupLocation
);


router.post(
  "/assign-awb",
  shiprocketAssignAWB
);


// GENERATE PICKUP
router.post("/generate-pickup", shiprocketGeneratePickup);

// GENERATE LABEL
router.post("/generate-label", shiprocketGenerateLabel);

// GENERATE MANIFEST
router.post("/generate-manifest", shiprocketGenerateManifest);

// TRACK AWB
router.get("/track/:awb", shiprocketTrackAWB);

// CANCEL ORDER
router.post("/cancel-order", shiprocketCancelOrder);

module.exports = router;