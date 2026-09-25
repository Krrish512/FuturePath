const Curriculum = require("../models/Curriculum");

// @desc    Get all curriculum records
// @route   GET /api/curriculum
// @access  Public
const getAllCurriculum = async (req, res) => {
    try {
        const { university_id, course_id, semester, search } = req.query;
        let query = {};

        if (university_id) {
            query.university_id = university_id;
        }

        if (course_id) {
            query.course_id = course_id;
        }

        if (semester) {
            query.semester_number = Number(semester);
        }

        if (search) {
            query.$or = [
                { subject_name: { $regex: search, $options: "i" } },
                { subject_code: { $regex: search, $options: "i" } },
                { course_name: { $regex: search, $options: "i" } },
                { university_name: { $regex: search, $options: "i" } }
            ];
        }

        const list = await Curriculum.find(query).sort({ university_id: 1, course_id: 1, semester_number: 1, subject_code: 1 });
        res.json({
            success: true,
            count: list.length,
            data: list
        });
    } catch (error) {
        console.error("Error fetching curriculum:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @desc    Get single curriculum record
// @route   GET /api/curriculum/:id
// @access  Public
const getCurriculumById = async (req, res) => {
    try {
        const item = await Curriculum.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Curriculum record not found" });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// @desc    Create curriculum record
// @route   POST /api/curriculum
// @access  Admin
const createCurriculum = async (req, res) => {
    try {
        const item = await Curriculum.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create curriculum", error: error.message });
    }
};

// @desc    Update curriculum record
// @route   PUT /api/curriculum/:id
// @access  Admin
const updateCurriculum = async (req, res) => {
    try {
        const item = await Curriculum.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!item) {
            return res.status(404).json({ success: false, message: "Curriculum record not found" });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to update curriculum", error: error.message });
    }
};

// @desc    Delete curriculum record
// @route   DELETE /api/curriculum/:id
// @access  Admin
const deleteCurriculum = async (req, res) => {
    try {
        const item = await Curriculum.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Curriculum record not found" });
        }
        res.json({ success: true, message: "Curriculum record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {
    getAllCurriculum,
    getCurriculumById,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum
};
