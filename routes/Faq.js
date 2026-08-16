
import express from "express";
import Faq from "../models/Faq.js";

const router = express.Router();
// console.log(
//   "FAQ ENUM VALUES:",
//   Faq.schema.path("category").enumValues
// );
/* ===========================
   Add FAQ
=========================== */

router.post("/faqs", async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await Faq.create({
      question,
      answer,
      category,
    });

    res.status(201).json({
      success: true,
      message: "FAQ Added Successfully",
      faq,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ===========================
   Get All FAQs
=========================== */

router.get("/faqs-info", async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });

    res.json(faqs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ===========================
   Get FAQs by Category
=========================== */

router.get("/faqs/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const faqs = await Faq.find({
      $or: [
        { category },
        { category: "Apply In All" },
      ],
    }).sort({ createdAt: -1 });

    res.json(faqs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;