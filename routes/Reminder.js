// server.js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();







const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const API_VERSION = process.env.WHATSAPP_API_VERSION || "17.0";


app.post("/send-whatsapp", async (req, res) => {
  try {
    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({ error: "Missing WhatsApp number or message" });
    }

   

    const url = `https://graph.facebook.com/v${API_VERSION}/${PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: number,
      type: "text",
      text: { body: message },
    };

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

   
    const {data} = await axios.post(url, payload, { headers });

    console.log(" WhatsApp message sent successfully:", data);
    return res.status(200).json({ success: true, data: data });

  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      error: error.response?.data || "Internal Server Error",
    });
  }
});

export default app;
