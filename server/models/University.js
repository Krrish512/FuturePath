const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
    {
        university_id: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        university_name: {
            type: String,
            required: true,
            trim: true
        },
        abbreviation: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            default: "Gujarat",
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        official_website: {
            type: String,
            required: true,
            trim: true
        },
        established_year: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("University", universitySchema);
