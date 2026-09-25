const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    state: {
      type: String,
      default: "Gujarat",
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["College", "University", "Institute", "Polytechnic", "School"],
    },

    affiliation: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    coursesOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Institution", institutionSchema);
