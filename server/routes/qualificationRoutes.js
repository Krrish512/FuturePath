const express = require("express");

const {
    createQualification,
    getQualifications,
    getQualification,
    updateQualification,
    deleteQualification
} = require("../controllers/qualificationController");

const router = express.Router();

router.post("/", createQualification);
router.get("/", getQualifications);
router.get("/:id", getQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);

module.exports = router;
