const Course = require("../models/Course");
const Qualification = require("../models/Qualification");

// Create Course
const createCourse = async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty or missing. Please provide JSON data and set Content-Type header to application/json in Postman."
            });
        }

        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Course
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid course ID"
        });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    try {
        console.log("UPDATE REQUEST BODY:", req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.json({
            success: true,
            message: "Course updated successfully",
            data: course
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        res.json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid course ID"
        });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
};