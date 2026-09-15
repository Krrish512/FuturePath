const Career = require("../models/Career");

// Create Career
const createCareer = async (req, res) => {
    try {
        console.log("CAREER REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const career = await Career.create(req.body);

        res.status(201).json({
            success: true,
            message: "Career created successfully",
            data: career
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Career already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Careers
const getCareers = async (req, res) => {
    try {
        const careers = await Career.find()
            .populate("relatedCourses", "name duration")
            .sort({ title: 1 });

        res.json({
            success: true,
            count: careers.length,
            data: careers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Career
const getCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id)
            .populate("relatedCourses", "name duration");

        if (!career) {
            return res.status(404).json({
                success: false,
                message: "Career not found"
            });
        }

        res.json({
            success: true,
            data: career
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid career ID"
        });
    }
};

// Update Career
const updateCareer = async (req, res) => {
    try {
        console.log("UPDATE CAREER REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const career = await Career.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!career) {
            return res.status(404).json({
                success: false,
                message: "Career not found"
            });
        }

        res.json({
            success: true,
            message: "Career updated successfully",
            data: career
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Career already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Career
const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);

        if (!career) {
            return res.status(404).json({
                success: false,
                message: "Career not found"
            });
        }

        res.json({
            success: true,
            message: "Career deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid career ID"
        });
    }
};

module.exports = {
    createCareer,
    getCareers,
    getCareer,
    updateCareer,
    deleteCareer
};
