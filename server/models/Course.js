const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        qualification: {
            type: String,
            required: true,
            enum: ["10th", "12th"]
        },

        stream: {
            type: String,
            required: true,
            enum: ["Science", "Commerce", "Arts", "General"]
        },

        duration: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        eligibility: {
            type: String,
            required: true
        },

        careerOptions: {
            type: [String],
            default: []
        },

        subjects: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);