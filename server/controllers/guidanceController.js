const Qualification = require("../models/Qualification");
const Stream = require("../models/Stream");
const Pathway = require("../models/Pathway");
const Course = require("../models/Course");
const Institution = require("../models/Institution");
const Career = require("../models/Career");

// Get Consolidated Guidance based on student qualification and stream
const getGuidanceByOptions = async (req, res) => {
    try {
        const { qualification, stream } = req.query;

        if (!qualification) {
            return res.status(400).json({
                success: false,
                message: "Please provide a qualification (e.g. '10th' or '12th') in query parameters."
            });
        }

        // 1. Resolve Qualification document if name passed
        const qualDoc = await Qualification.findOne({
            name: { $regex: new RegExp(`^${qualification}$`, "i") }
        });

        // 2. Fetch Streams under this qualification
        let streams = [];
        if (qualDoc) {
            streams = await Stream.find({ qualification: qualDoc._id, isActive: true });
        }

        // 3. Resolve Stream document if specified
        let streamDoc = null;
        if (stream && qualDoc) {
            streamDoc = await Stream.findOne({
                qualification: qualDoc._id,
                name: { $regex: new RegExp(`^${stream}$`, "i") }
            });
        }

        // 4. Fetch Pathways
        const pathwayQuery = { isActive: true };
        if (qualDoc) pathwayQuery.qualification = qualDoc._id;
        if (streamDoc) pathwayQuery.stream = streamDoc._id;

        const pathways = await Pathway.find(pathwayQuery)
            .populate("qualification", "name")
            .populate("stream", "name");

        // 5. Fetch Courses
        const courseQuery = {
            qualification: { $regex: new RegExp(`^${qualification}$`, "i") }
        };
        if (stream) {
            courseQuery.stream = { $regex: new RegExp(`^${stream}$`, "i") };
        }
        const courses = await Course.find(courseQuery).sort({ name: 1 });

        // 6. Fetch Careers linked to those courses
        const courseIds = courses.map((c) => c._id);
        const careers = await Career.find({
            $or: [
                { relatedCourses: { $in: courseIds } },
                { isActive: true }
            ]
        }).populate("relatedCourses", "name duration");

        // 7. Fetch Institutions offering those courses
        const institutions = await Institution.find({
            coursesOffered: { $in: courseIds },
            isActive: true
        })
            .populate("city", "name state")
            .populate("coursesOffered", "name duration");

        res.json({
            success: true,
            filters: {
                qualification,
                stream: stream || "All"
            },
            data: {
                qualification: qualDoc || { name: qualification },
                availableStreams: streams,
                pathways,
                courses,
                careers: careers.slice(0, 10),
                institutions: institutions.slice(0, 10)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Portal Overview / Summary Statistics for Dashboard & Home Page
const getGuidanceSummary = async (req, res) => {
    try {
        const [
            qualificationsCount,
            streamsCount,
            pathwaysCount,
            coursesCount,
            institutionsCount,
            careersCount
        ] = await Promise.all([
            Qualification.countDocuments({ isActive: true }),
            Stream.countDocuments({ isActive: true }),
            Pathway.countDocuments({ isActive: true }),
            Course.countDocuments(),
            Institution.countDocuments({ isActive: true }),
            Career.countDocuments({ isActive: true })
        ]);

        res.json({
            success: true,
            summary: {
                totalQualifications: qualificationsCount,
                totalStreams: streamsCount,
                totalPathways: pathwaysCount,
                totalCourses: coursesCount,
                totalInstitutions: institutionsCount,
                totalCareers: careersCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getGuidanceByOptions,
    getGuidanceSummary
};
