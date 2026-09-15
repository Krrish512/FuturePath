const express = require("express");

const {
    getGuidanceByOptions,
    getGuidanceSummary
} = require("../controllers/guidanceController");

const router = express.Router();

router.get("/", getGuidanceByOptions);
router.get("/summary", getGuidanceSummary);

module.exports = router;
