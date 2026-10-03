const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripName: {
      type: String,
      required: true,
      trim: true,
      default: "Kashi Yatra",
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    checkInDate: {
      type: Date,
      default: null,
    },

    checkOutDate: {
      type: Date,
      default: null,
    },

    hotelName: {
      type: String,
      trim: true,
      default: "",
    },

    hotelLocation: {
      type: String,
      trim: true,
      default: "",
    },

    checkInTime: {
      type: String,
      trim: true,
      default: "",
    },

    checkOutTime: {
      type: String,
      trim: true,
      default: "",
    },

    travelDetails: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    budget: {
      type: Number,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Planning", "Upcoming", "Ongoing", "Completed"],
      default: "Planning",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);