const express = require("express");
const router = express.Router();
const {
    getAllCurriculum,
    getCurriculumById,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum
} = require("../controllers/curriculumController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/")
    .get(getAllCurriculum)
    .post(protect, adminOnly, createCurriculum);

router.route("/:id")
    .get(getCurriculumById)
    .put(protect, adminOnly, updateCurriculum)
    .delete(protect, adminOnly, deleteCurriculum);

module.exports = router;
