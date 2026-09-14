const express = require("express");

const {
    createCity,
    getCities,
    getCity,
    updateCity,
    deleteCity
} = require("../controllers/cityController");

const router = express.Router();

router.post("/", createCity);
router.get("/", getCities);
router.get("/:id", getCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

module.exports = router;
