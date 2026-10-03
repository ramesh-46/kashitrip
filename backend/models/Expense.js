const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidBy: {
      type: String,
      required: true,
      trim: true,
      enum: ["Ramesh", "Srikanth", "Prathap", "Ganesh"],
    },

    paymentType: {
      type: String,
      required: true,
      enum: [
        "UPI",
        "Cash",
        "Card",
        "Bank Transfer",
        "Other",
      ],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Travel",
        "Hotel",
        "Food",
        "Temple",
        "Shopping",
        "Local Transport",
        "Tickets",
        "Donations",
        "Other",
      ],
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    receiptImage: {
      type: String,
      trim: true,
      default: "",
    },

    isSettled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);