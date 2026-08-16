import express from "express";
import Customer from "../models/AddCustomer.js";

const router = express.Router(); 

// POST - Add a new customer
router.post("/add-customer", async (req, res) => {
  try {
    const { fullName, mobileNumber, attendedBy, leadSource } = req.body;


     const existingCustomer = await Customer.findOne({
      $or: [
        { mobileNumber: mobileNumber?.trim() },
        { fullName: { $regex: new RegExp(`^${fullName}$`, "i") } }, // case-insensitive match
      ],
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "Customer already exists with this name or mobile number",
        existingCustomer,
      });
    }
    // ✅ Create a new Customer instance
    const newCustomer = new Customer({
      fullName,
      mobileNumber,
      attendedBy,
      leadSource,
    });

    // ✅ Save to MongoDB
    const savedCustomer = await newCustomer.save();
    console.log("New customer added:", savedCustomer);

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: "Customer added successfully",
    });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({
      success: false,
      message: "Error adding customer",
      error: error.message,
    });
  }
});

export default router;
