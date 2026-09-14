const City = require("../models/City");

// Create City
const createCity = async (req, res) => {
    try {
        console.log("CITY REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const city = await City.create(req.body);

        res.status(201).json({
            success: true,
            message: "City created successfully",
            data: city
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "City name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Cities
const getCities = async (req, res) => {
    try {
        const cities = await City.find().sort({ name: 1 });

        res.json({
            success: true,
            count: cities.length,
            data: cities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single City
const getCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        res.json({
            success: true,
            data: city
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid city ID"
        });
    }
};

// Update City
const updateCity = async (req, res) => {
    try {
        console.log("UPDATE CITY REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const city = await City.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        res.json({
            success: true,
            message: "City updated successfully",
            data: city
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "City name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete City
const deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);

        if (!city) {
            return res.status(404).json({
                success: false,
                message: "City not found"
            });
        }

        res.json({
            success: true,
            message: "City deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid city ID"
        });
    }
};

module.exports = {
    createCity,
    getCities,
    getCity,
    updateCity,
    deleteCity
};
