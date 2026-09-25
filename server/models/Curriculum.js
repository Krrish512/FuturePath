const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema(
    {
        curriculum_id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        university_id: {
            type: String,
            required: true,
            trim: true
        },
        university_name: {
            type: String,
            required: true,
            trim: true
        },
        course_id: {
            type: String,
            required: true,
            trim: true
        },
        course_name: {
            type: String,
            required: true,
            trim: true
        },
        academic_year: {
            type: String,
            required: true,
            trim: true
        },
        semester_number: {
            type: Number,
            required: true
        },
        semester_name: {
            type: String,
            required: true,
            trim: true
        },
        subject_code: {
            type: String,
            trim: true
        },
        subject_name: {
            type: String,
            required: true,
            trim: true
        },
        subject_type: {
            type: String,
            trim: true
        },
        credits: {
            type: String,
            trim: true
        },
        theory_practical: {
            type: String,
            trim: true
        },
        official_source_url: {
            type: String,
            required: true,
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Curriculum", curriculumSchema);
