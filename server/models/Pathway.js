const mongoose = require("mongoose");

const pathwaySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        qualification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Qualification",
            required: true
        },

        stream: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stream",
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        steps: {
            type: [String],
            default: []
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

module.exports = mongoose.model("Pathway", pathwaySchema);
