const express = require("express");
const router = express.Router();
const {
    getAllUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
} = require("../controllers/universityController");
const { protect, admin } = require("../middleware/auth");

router.route("/")
    .get(getAllUniversities)
    .post(protect, admin, createUniversity);

router.route("/:id")
    .get(getUniversityById)
    .put(protect, admin, updateUniversity)
    .delete(protect, admin, deleteUniversity);

module.exports = router;
