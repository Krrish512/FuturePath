const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        course_id: {
            type: String,
            trim: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        course_name: {
            type: String,
            trim: true
        },
        university_id: {
            type: String,
            trim: true
        },
        university_name: {
            type: String,
            trim: true
        },
        course_level: {
            type: String,
            default: "Undergraduate",
            trim: true
        },
        field_of_study: {
            type: String,
            trim: true
        },
        qualification: {
            type: String,
            default: "12th"
        },
        stream: {
            type: String,
            default: "General"
        },
        duration: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        eligibility: {
            type: String,
            required: true
        },
        programmeType: {
            type: String,
            default: "degree",
            trim: true
        },
        entranceExam: {
            type: String,
            trim: true,
            default: ""
        },
        official_source_url: {
            type: String,
            trim: true
        },
        verification_status: {
            type: String,
            enum: ["VERIFIED", "PARTIALLY_VERIFIED", "NOT_VERIFIED"],
            default: "VERIFIED"
        },
        last_verified: {
            type: String,
            trim: true
        },
        careerOptions: {
            type: [String],
            default: []
        },
        subjects: {
            type: [String],
            default: []
        },
        interestTags: {
            type: [String],
            default: []
        },
        subjectTags: {
            type: [String],
            default: []
        },
        skillTags: {
            type: [String],
            default: []
        },
        workStyleTags: {
            type: [String],
            default: []
        },
        careerTags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to ensure name and course_name match
courseSchema.pre("save", function (next) {
    if (!this.course_name && this.name) {
        this.course_name = this.name;
    }
    if (!this.name && this.course_name) {
        this.name = this.course_name;
    }
    next();
});

module.exports = mongoose.model("Course", courseSchema);