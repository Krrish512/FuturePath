const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        requiredSkills: {
            type: [String],
            default: []
        },

        salaryRange: {
            type: String,
            trim: true
        },

        jobRoles: {
            type: [String],
            default: []
        },

        relatedCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Career", careerSchema);
