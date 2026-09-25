const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
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

// Get All Courses with filter & search
const getCourses = async (req, res) => {
    try {
        const {
            search,
            university,
            university_id,
            course_level,
            field_of_study,
            duration,
            qualification,
            stream,
            verification_status
        } = req.query;

        let query = {};

        if (university) {
            query.$or = [
                { university_name: { $regex: university, $options: "i" } },
                { university_id: university }
            ];
        }

        if (university_id) {
            query.university_id = university_id;
        }

        if (course_level) {
            query.course_level = { $regex: course_level, $options: "i" };
        }

        if (field_of_study) {
            query.field_of_study = { $regex: field_of_study, $options: "i" };
        }

        if (duration) {
            query.duration = { $regex: duration, $options: "i" };
        }

        if (qualification) {
            query.qualification = qualification;
        }

        if (stream && stream !== "All") {
            query.stream = stream;
        }

        if (verification_status) {
            query.verification_status = verification_status;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { course_name: { $regex: search, $options: "i" } },
                { university_name: { $regex: search, $options: "i" } },
                { field_of_study: { $regex: search, $options: "i" } },
                { eligibility: { $regex: search, $options: "i" } }
            ];
        }

        const courses = await Course.find(query).sort({ university_name: 1, name: 1 });

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