const University = require("../models/University");

// @desc    Get all universities
// @route   GET /api/universities
// @access  Public
const getAllUniversities = async (req, res) => {
    try {
        const { search, type } = req.query;
        let query = { isActive: true };

        if (search) {
            query.$or = [
                { university_name: { $regex: search, $options: "i" } },
                { abbreviation: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        if (type) {
            query.type = type;
        }

        const universities = await University.find(query).sort({ university_name: 1 });
        res.json({
            success: true,
            count: universities.length,
            data: universities
        });
    } catch (error) {
        console.error("Error fetching universities:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @desc    Get single university
// @route   GET /api/universities/:id
// @access  Public
const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ success: false, message: "University not found" });
        }
        res.json({ success: true, data: university });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @desc    Create university
// @route   POST /api/universities
// @access  Admin
const createUniversity = async (req, res) => {
    try {
        const university = await University.create(req.body);
        res.status(201).json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create university", error: error.message });
    }
};

// @desc    Update university
// @route   PUT /api/universities/:id
// @access  Admin
const updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!university) {
            return res.status(404).json({ success: false, message: "University not found" });
        }
        res.json({ success: true, data: university });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to update university", error: error.message });
    }
};

// @desc    Delete university
// @route   DELETE /api/universities/:id
// @access  Admin
const deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(req.params.id);
        if (!university) {
            return res.status(404).json({ success: false, message: "University not found" });
        }
        res.json({ success: true, message: "University deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {
    getAllUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
};
