const express = require("express");

const Trip = require("../models/Trip");
const Member = require("../models/Member");
const Expense = require("../models/Expense");
const Place = require("../models/Place");

const router = express.Router();

/* =========================================================
   TRIP ROUTES
========================================================= */

// GET TRIP
router.get("/trip", async (req, res) => {
  try {
    let trip = await Trip.findOne();

    if (!trip) {
      trip = await Trip.create({
        tripName: "Kashi Yatra",
      });
    }

    res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE TRIP
router.put("/trip", async (req, res) => {
  try {
    let trip = await Trip.findOne();

    if (!trip) {
      trip = await Trip.create(req.body);
    } else {
      trip = await Trip.findByIdAndUpdate(
        trip._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================================================
   MEMBER ROUTES
========================================================= */

// GET MEMBERS
router.get("/members", async (req, res) => {
  try {
    let members = await Member.find().sort({ name: 1 });

    // Create default members if database is empty
    if (members.length === 0) {
      const defaultMembers = [
        { name: "Ramesh" },
        { name: "Srikanth" },
        { name: "Prathap" },
        { name: "Ganesh" },
      ];

      await Member.insertMany(defaultMembers);

      members = await Member.find().sort({ name: 1 });
    }

    res.json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================================================
   EXPENSE ROUTES
========================================================= */

// GET ALL EXPENSES
router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      date: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET SINGLE EXPENSE
router.get("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE EXPENSE
router.post("/expenses", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE EXPENSE
router.put("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE EXPENSE
router.delete("/expenses/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(
      req.params.id
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================================================
   PLACE ROUTES
========================================================= */

// GET ALL PLACES
router.get("/places", async (req, res) => {
  try {
    const places = await Place.find().sort({
      priority: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: places,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET SINGLE PLACE
router.get("/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    res.json({
      success: true,
      data: place,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE PLACE
router.post("/places", async (req, res) => {
  try {
    const place = await Place.create(req.body);

    res.status(201).json({
      success: true,
      message: "Place added successfully",
      data: place,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE PLACE
router.put("/places/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    res.json({
      success: true,
      message: "Place updated successfully",
      data: place,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE PLACE
router.delete("/places/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(
      req.params.id
    );

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    res.json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================================================
   TEST ROUTE
========================================================= */

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API routes are working",
  });
});

module.exports = router;