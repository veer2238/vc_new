import express from "express";
import {
  createConsultation,
  getConsultations,
} from "../Api/ConsultationApi.js";

const router = express.Router();

router.post("/consultation", createConsultation);

router.get("/consultation", getConsultations);

export default router;