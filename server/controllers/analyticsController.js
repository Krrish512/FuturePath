const University = require("../models/University");
const Course = require("../models/Course");
const Curriculum = require("../models/Curriculum");
const Institution = require("../models/Institution");
const Career = require("../models/Career");
const Pathway = require("../models/Pathway");
const User = require("../models/User");

// @desc    Get comprehensive dashboard & platform analytics
// @route   GET /api/analytics/dashboard
// @access  Public / Admin
const getDashboardAnalytics = async (req, res) => {
    try {
        const [
            totalUniversities,
            totalCourses,
            totalCurriculum,
            totalInstitutions,
            totalCareers,
            totalPathways,
            totalStudents,
            totalAdmins
        ] = await Promise.all([
            University.countDocuments(),
            Course.countDocuments(),
            Curriculum.countDocuments(),
            Institution.countDocuments(),
            Career.countDocuments(),
            Pathway.countDocuments(),
            User.countDocuments({ role: "student" }),
            User.countDocuments({ role: "admin" })
        ]);

        // 1. Courses by University
        const coursesByUniversity = await Course.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$university_name", "Unassigned"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // 2. Courses by Field of Study
        const coursesByField = await Course.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$field_of_study", "General"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 8 }
        ]);

        // 3. Courses by Level (UG, PG, Integrated)
        const coursesByLevel = await Course.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$course_level", "Undergraduate"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // 4. Institutions by City
        const institutionsByCity = await Institution.aggregate([
            {
                $lookup: {
                    from: "cities",
                    localField: "city",
                    foreignField: "_id",
                    as: "cityInfo"
                }
            },
            {
                $unwind: {
                    path: "$cityInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: { $ifNull: ["$cityInfo.name", "Other"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // 5. Institutions by Type
        const institutionsByType = await Institution.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$type", "College"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // 6. Curriculum Records by University
        const curriculumByUniversity = await Curriculum.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$university_name", "Unknown"] },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // 7. Course Verification Statuses
        const coursesByVerification = await Course.aggregate([
            {
                $group: {
                    _id: { $ifNull: ["$verification_status", "VERIFIED"] },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            summary: {
                totalUniversities,
                totalCourses,
                totalCurriculum,
                totalInstitutions,
                totalCareers,
                totalPathways,
                totalStudents,
                totalAdmins,
                totalUsers: totalStudents + totalAdmins
            },
            charts: {
                coursesByUniversity: coursesByUniversity.map(i => ({ label: i._id, value: i.count })),
                coursesByField: coursesByField.map(i => ({ label: i._id, value: i.count })),
                coursesByLevel: coursesByLevel.map(i => ({ label: i._id, value: i.count })),
                institutionsByCity: institutionsByCity.map(i => ({ label: i._id, value: i.count })),
                institutionsByType: institutionsByType.map(i => ({ label: i._id, value: i.count })),
                curriculumByUniversity: curriculumByUniversity.map(i => ({ label: i._id, value: i.count })),
                coursesByVerification: coursesByVerification.map(i => ({ label: i._id, value: i.count }))
            }
        });
    } catch (error) {
        console.error("Error generating analytics:", error);
        res.status(500).json({ success: false, message: "Analytics error", error: error.message });
    }
};

module.exports = {
    getDashboardAnalytics
};
