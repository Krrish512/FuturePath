const Institution = require("../models/Institution");

// Create Institution
const createInstitution = async (req, res) => {
    try {
        console.log("INSTITUTION REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const institution = await Institution.create(req.body);

        res.status(201).json({
            success: true,
            message: "Institution created successfully",
            data: institution
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Institution already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Institutions
const getInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.find()
            .populate("city", "name state")
            .populate("coursesOffered", "name duration")
            .sort({ name: 1 });

        res.json({
            success: true,
            count: institutions.length,
            data: institutions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Institution
const getInstitution = async (req, res) => {
    try {
        const institution = await Institution.findById(req.params.id)
            .populate("city", "name state")
            .populate("coursesOffered", "name duration");

        if (!institution) {
            return res.status(404).json({
                success: false,
                message: "Institution not found"
            });
        }

        res.json({
            success: true,
            data: institution
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid institution ID"
        });
    }
};

// Update Institution
const updateInstitution = async (req, res) => {
    try {
        console.log("UPDATE INSTITUTION REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const institution = await Institution.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!institution) {
            return res.status(404).json({
                success: false,
                message: "Institution not found"
            });
        }

        res.json({
            success: true,
            message: "Institution updated successfully",
            data: institution
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Institution already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Institution
const deleteInstitution = async (req, res) => {
    try {
        const institution = await Institution.findByIdAndDelete(req.params.id);

        if (!institution) {
            return res.status(404).json({
                success: false,
                message: "Institution not found"
            });
        }

        res.json({
            success: true,
            message: "Institution deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid institution ID"
        });
    }
};

module.exports = {
    createInstitution,
    getInstitutions,
    getInstitution,
    updateInstitution,
    deleteInstitution
};
