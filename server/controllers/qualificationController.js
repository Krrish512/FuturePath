const Qualification = require("../models/Qualification");
const createQualification = async (req, res) => {
    try {
        console.log("QUALIFICATION REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const qualification = await Qualification.create(req.body);

        res.status(201).json({
            success: true,
            message: "Qualification created successfully",
            data: qualification
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Qualification name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getQualifications = async (req, res) => {
    try {
        const qualifications = await Qualification.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: qualifications.length,
            data: qualifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);

        if (!qualification) {
            return res.status(404).json({
                success: false,
                message: "Qualification not found"
            });
        }

        res.json({
            success: true,
            data: qualification
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid qualification ID"
        });
    }
};
const updateQualification = async (req, res) => {
    try {
        console.log("UPDATE QUALIFICATION REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const qualification = await Qualification.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!qualification) {
            return res.status(404).json({
                success: false,
                message: "Qualification not found"
            });
        }

        res.json({
            success: true,
            message: "Qualification updated successfully",
            data: qualification
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Qualification name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndDelete(req.params.id);

        if (!qualification) {
            return res.status(404).json({
                success: false,
                message: "Qualification not found"
            });
        }

        res.json({
            success: true,
            message: "Qualification deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid qualification ID"
        });
    }
};
module.exports = {
    createQualification,
    getQualifications,
    getQualification,
    updateQualification,
    deleteQualification
};
