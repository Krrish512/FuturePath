const University = require("../models/University");
const Course = require("../models/Course");
const Curriculum = require("../models/Curriculum");
const Institution = require("../models/Institution");
const Career = require("../models/Career");
const Pathway = require("../models/Pathway");
const User = require("../models/User");

// @desc    Generate report data based on report type and dynamic filters
// @route   POST /api/reports/generate
// @access  Public / Admin
const generateReport = async (req, res) => {
    try {
        const { reportType, filters = {}, columns = [] } = req.body;
        let data = [];
        let summary = {};

        switch (reportType) {
            case "university": {
                let query = {};
                if (filters.type) query.type = filters.type;
                if (filters.location) query.location = { $regex: filters.location, $options: "i" };
                data = await University.find(query).sort({ university_name: 1 });
                break;
            }

            case "course": {
                let query = {};
                if (filters.university_id) query.university_id = filters.university_id;
                if (filters.university_name) query.university_name = { $regex: filters.university_name, $options: "i" };
                if (filters.course_level) query.course_level = filters.course_level;
                if (filters.field_of_study) query.field_of_study = { $regex: filters.field_of_study, $options: "i" };
                if (filters.verification_status) query.verification_status = filters.verification_status;
                if (filters.duration) query.duration = { $regex: filters.duration, $options: "i" };
                data = await Course.find(query).sort({ university_name: 1, name: 1 });
                break;
            }

            case "curriculum": {
                let query = {};
                if (filters.university_id) query.university_id = filters.university_id;
                if (filters.course_id) query.course_id = filters.course_id;
                if (filters.semester_number) query.semester_number = Number(filters.semester_number);
                if (filters.subject_type) query.subject_type = filters.subject_type;
                if (filters.verification_status) query.verification_status = filters.verification_status;
                data = await Curriculum.find(query).sort({ university_name: 1, course_name: 1, semester_number: 1, subject_code: 1 });
                break;
            }

            case "institution": {
                let query = {};
                if (filters.type) query.type = filters.type;
                if (filters.city) query.city = filters.city;
                data = await Institution.find(query).populate("city", "name state").populate("coursesOffered", "name course_level duration").sort({ name: 1 });
                break;
            }

            case "career": {
                data = await Career.find().populate("courses", "name duration university_name").sort({ title: 1 });
                break;
            }

            case "pathway": {
                data = await Pathway.find().populate("qualification", "name").populate("stream", "name").sort({ title: 1 });
                break;
            }

            case "user": {
                let query = {};
                if (filters.role) query.role = filters.role;
                data = await User.find(query).select("-password").sort({ createdAt: -1 });
                break;
            }

            case "combined": {
                const [unis, crses, currs, insts] = await Promise.all([
                    University.countDocuments(),
                    Course.countDocuments(),
                    Curriculum.countDocuments(),
                    Institution.countDocuments()
                ]);
                summary = {
                    totalUniversities: unis,
                    totalCourses: crses,
                    totalCurriculumRows: currs,
                    totalInstitutions: insts
                };
                data = await Course.find().limit(50).sort({ university_name: 1 });
                break;
            }

            default:
                return res.status(400).json({ success: false, message: "Invalid report type" });
        }

        res.json({
            success: true,
            reportType,
            totalRecords: data.length,
            generatedAt: new Date().toISOString(),
            appliedFilters: filters,
            summary,
            data
        });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ success: false, message: "Report generation error", error: error.message });
    }
};

module.exports = {
    generateReport
};
