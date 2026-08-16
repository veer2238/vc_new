import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ==========================
// Get All Reviews
// ==========================
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ status: true });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================
// Add Review
// ==========================
router.post("/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;