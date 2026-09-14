const Pathway = require("../models/Pathway");

// Create Pathway
const createPathway = async (req, res) => {
    try {
        console.log("PATHWAY REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const pathway = await Pathway.create(req.body);

        res.status(201).json({
            success: true,
            message: "Pathway created successfully",
            data: pathway
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Pathway already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Pathways
const getPathways = async (req, res) => {
    try {
        const pathways = await Pathway.find()
            .populate("qualification", "name")
            .populate("stream", "name")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: pathways.length,
            data: pathways
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Pathway
const getPathway = async (req, res) => {
    try {
        const pathway = await Pathway.findById(req.params.id)
            .populate("qualification", "name")
            .populate("stream", "name");

        if (!pathway) {
            return res.status(404).json({
                success: false,
                message: "Pathway not found"
            });
        }

        res.json({
            success: true,
            data: pathway
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid pathway ID"
        });
    }
};

// Update Pathway
const updatePathway = async (req, res) => {
    try {
        console.log("UPDATE PATHWAY REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const pathway = await Pathway.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!pathway) {
            return res.status(404).json({
                success: false,
                message: "Pathway not found"
            });
        }

        res.json({
            success: true,
            message: "Pathway updated successfully",
            data: pathway
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Pathway already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Pathway
const deletePathway = async (req, res) => {
    try {
        const pathway = await Pathway.findByIdAndDelete(req.params.id);

        if (!pathway) {
            return res.status(404).json({
                success: false,
                message: "Pathway not found"
            });
        }

        res.json({
            success: true,
            message: "Pathway deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid pathway ID"
        });
    }
};

module.exports = {
    createPathway,
    getPathways,
    getPathway,
    updatePathway,
    deletePathway
};
