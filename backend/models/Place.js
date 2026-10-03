const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      default: null,
    },

    startTime: {
      type: String,
      trim: true,
      default: "",
    },

    endTime: {
      type: String,
      trim: true,
      default: "",
    },

    openingTime: {
      type: String,
      trim: true,
      default: "",
    },

    closingTime: {
      type: String,
      trim: true,
      default: "",
    },

    darshanInfo: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Planned",
        "Visited",
        "Skipped",
        "Cancelled",
      ],
      default: "Planned",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    category: {
      type: String,
      enum: [
        "Temple",
        "Ghat",
        "Aarti",
        "Food",
        "Shopping",
        "Travel",
        "Other",
      ],
      default: "Temple",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", placeSchema);