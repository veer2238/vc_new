import express from "express"
import Country from "../models/Country.js"
// import verifyAdmin from "./verifyAdmin.js"

const app = express()

// =============================
// CREATE COUNTRY (Admin Only)
// =============================
// app.post("/country", async (req, res) => {
//   try {
//     const country = await Country.create(req.body)

//     res.json({
//       success: true,
//       message: "Country added successfully",
//       data: country
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// })

app.post("/country", async (req, res) => {
  try {
    const {
      name,
      slug,
      region,
      image,
      flag,
      visaType,
      processingTime,
      fees,
      documents,
      guaranteeDays,
    } = req.body;

    const country = await Country.create({
      name,
      slug,
      region,
      image,
      flag,
      visaType,
      processingTime,
      fees,
      documents,
      guaranteeDays,
    });

    res.status(201).json({
      success: true,
      message: "Country added successfully",
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// =============================
// GET ALL ACTIVE COUNTRIES
// =============================
app.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find({ isActive: true })
      // .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: countries
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" })
  }
})


// =============================
// GET SINGLE COUNTRY BY SLUG
// =============================
// app.get("/country/:slug", async (req, res) => {
//   try {
//     const country = await Country.findOne({
//       slug: req.params.slug,
//       isActive: true
//     })

//     if (!country)
//       return res.status(404).json({ success: false, error: "Not Found" })

//     res.json({ success: true, data: country })
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server Error" })
//   }
// })


// =============================
// UPDATE COUNTRY
// =============================
// app.put("/country/:id", verifyAdmin, async (req, res) => {
//   try {
//     const updated = await Country.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )

//     res.json({
//       success: true,
//       message: "Country updated",
//       data: updated
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// })


// =============================
// DELETE COUNTRY
// =============================
// app.delete("/country/:id", verifyAdmin, async (req, res) => {
//   try {
//     await Country.findByIdAndDelete(req.params.id)

//     res.json({
//       success: true,
//       message: "Country deleted"
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message })
//   }
// })

export default app