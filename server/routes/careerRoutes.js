const express = require("express");

const {
    createCareer,
    getCareers,
    getCareer,
    updateCareer,
    deleteCareer
} = require("../controllers/careerController");

const router = express.Router();

router.post("/", createCareer);
router.get("/", getCareers);
router.get("/:id", getCareer);
router.put("/:id", updateCareer);
router.delete("/:id", deleteCareer);

module.exports = router;
