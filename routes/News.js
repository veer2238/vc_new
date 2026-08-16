

import express from 'express';
import Newsletter from '../models/News.js';
import nodemailer from 'nodemailer';
import verifyAdmin from "./verifyAdmin.js";
import fs from 'fs';
import path from 'path';

const emailTemplatePath = path.join(
  process.cwd(),
  'emails',
  'newsletterSubscription.html'
);

const htmlContent = fs.readFileSync(emailTemplatePath, 'utf-8');

const app = express();

// Make uploaded files publicly accessible
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'))
);

// POST - Subscribe to newsletter
app.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        error: 'Already subscribed'
      });
    }

    const newSub = await Newsletter.create({ email });

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      cc: process.env.EMAIL_CC,
      subject: 'Welcome to Veer Consultancy Newsletter',
      html: htmlContent.replaceAll('{{email}}', email),
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    console.log(newSub);

    res.json({
      success: true,
      message: 'Subscribed successfully'
    });

  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      error: 'Server Error'
    });
  }
});

// GET - All subscribers
app.get('/api/news/all', verifyAdmin, async (req, res) => {
  try {
    const news = await Newsletter.find().sort({
      subscribedAt: -1
    });

    res.json(news);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

export default app;