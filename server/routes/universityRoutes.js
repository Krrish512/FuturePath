const express = require("express");
const router = express.Router();
const {
    getAllUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
} = require("../controllers/universityController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/")
    .get(getAllUniversities)
    .post(protect, adminOnly, createUniversity);

router.route("/:id")
    .get(getUniversityById)
    .put(protect, adminOnly, updateUniversity)
    .delete(protect, adminOnly, deleteUniversity);

module.exports = router;
