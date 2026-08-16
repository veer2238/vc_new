import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
import verifyAdmin from "./verifyAdmin.js";
import fs from 'fs'
import path from 'path'


const contactTemplatePath = path.join(
  process.cwd(),
  'emails',
  'contact.html'
)

const htmlContent = fs.readFileSync(contactTemplatePath, 'utf-8')



const app = express();

app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, reason, message } = req.body;

    

    // Prevent duplicates
    const existingContact = await Contact.findOne({ email, phone, reason });
    if (existingContact)
      return res.json({
        success: false,
        error: "You have already submitted an inquiry.we will get back to you soon.",
      });

    const newContact = await Contact.create({ name, email, phone, reason, message });
  

      
    console.log("New contact form submitted:", newContact);


    // ✉️ Send auto-reply email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const personalizedHTML = htmlContent
  .replace('{{name}}', name)
  .replace('{{email}}', email)
  .replace('{{phone}}', phone)
  .replace('{{reason}}', reason)
  .replace('{{message}}', message)

  const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  cc: process.env.EMAIL_CC,
  subject: "We Received Your Inquiry - Veer Consultancy",
   html: personalizedHTML,
};

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.json({ success: true, message: "Your callback request has been submitted successfully. We will reach out to you within 24 hours." });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

app.get("/api/contact/all", verifyAdmin, async (req, res) => {
 
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default app;
