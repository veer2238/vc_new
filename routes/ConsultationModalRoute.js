import express from "express";
import ConsultationModal from "../models/ConsultationModal.js";

const router = express.Router();

/* ===========================
   ADD CONSULTATION REQUEST
=========================== */

router.post("/consultation-modal", async (req, res) => {
  try {
    const {
      name,
      countryCode,
      phone,
      service,
      country,
      message,
    } = req.body;

    const consultation = await ConsultationModal.create({
      name,
      countryCode,
      phone,
      service,
      country,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      consultation,
    });
  } catch (error) {
    console.log("Consultation Modal Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ===========================
   GET ALL CONSULTATION REQUESTS
=========================== */

router.get("/consultation-modal", async (req, res) => {
  try {
    const consultations = await ConsultationModal.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    console.log("Get Consultation Modal Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;