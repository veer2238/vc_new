import Consultation from "../models/Consultation.js";

export const createConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully.",
      data: consultation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};