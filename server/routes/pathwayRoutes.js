const express = require("express");

const {
    createPathway,
    getPathways,
    getPathway,
    updatePathway,
    deletePathway
} = require("../controllers/pathwayController");

const router = express.Router();

router.post("/", createPathway);
router.get("/", getPathways);
router.get("/:id", getPathway);
router.put("/:id", updatePathway);
router.delete("/:id", deletePathway);

module.exports = router;
