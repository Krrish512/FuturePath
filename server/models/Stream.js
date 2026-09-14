const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        qualification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Qualification",
            required: true
        },

        description: {
            type: String,
            required: true,
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

module.exports = mongoose.model("Stream", streamSchema);
