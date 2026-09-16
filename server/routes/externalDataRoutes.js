const express = require("express");
const router = express.Router();
const externalDataController = require("../controllers/externalDataController");

// @route   GET /api/updates
// @desc    Get live & verified education updates and government portals
// @access  Public
router.get("/", externalDataController.getUpdates);

// @route   POST /api/updates/refresh
// @desc    Clear cache and fetch fresh updates
// @access  Public
router.post("/refresh", externalDataController.refreshUpdates);

module.exports = router;
