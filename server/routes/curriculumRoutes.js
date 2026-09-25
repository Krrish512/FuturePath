const express = require("express");
const router = express.Router();
const {
    getAllCurriculum,
    getCurriculumById,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum
} = require("../controllers/curriculumController");
const { protect, admin } = require("../middleware/auth");

router.route("/")
    .get(getAllCurriculum)
    .post(protect, admin, createCurriculum);

router.route("/:id")
    .get(getCurriculumById)
    .put(protect, admin, updateCurriculum)
    .delete(protect, admin, deleteCurriculum);

module.exports = router;
