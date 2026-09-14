const Stream = require("../models/Stream");

// Create Stream
const createStream = async (req, res) => {
    try {
        console.log("STREAM REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data."
            });
        }

        const stream = await Stream.create(req.body);

        res.status(201).json({
            success: true,
            message: "Stream created successfully",
            data: stream
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Stream name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Streams
const getStreams = async (req, res) => {
    try {
        const streams = await Stream.find()
            .populate("qualification", "name")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: streams.length,
            data: streams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Stream
const getStream = async (req, res) => {
    try {
        const stream = await Stream.findById(req.params.id)
            .populate("qualification", "name");

        if (!stream) {
            return res.status(404).json({
                success: false,
                message: "Stream not found"
            });
        }

        res.json({
            success: true,
            data: stream
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid stream ID"
        });
    }
};

// Update Stream
const updateStream = async (req, res) => {
    try {
        console.log("UPDATE STREAM REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const stream = await Stream.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!stream) {
            return res.status(404).json({
                success: false,
                message: "Stream not found"
            });
        }

        res.json({
            success: true,
            message: "Stream updated successfully",
            data: stream
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Stream name already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Stream
const deleteStream = async (req, res) => {
    try {
        const stream = await Stream.findByIdAndDelete(req.params.id);

        if (!stream) {
            return res.status(404).json({
                success: false,
                message: "Stream not found"
            });
        }

        res.json({
            success: true,
            message: "Stream deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid stream ID"
        });
    }
};

module.exports = {
    createStream,
    getStreams,
    getStream,
    updateStream,
    deleteStream
};
