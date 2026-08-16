import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { PDFDocument } from "pdf-lib"
// import pdfPoppler from "pdf-poppler"
import Tesseract from "tesseract.js"

const app = express()

// ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)

    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

const upload = multer({ storage })

app.post("/passport-receipt", upload.single("pdf"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      })
    }

    const filePath = req.file.path

    console.log("Uploaded file:", filePath)

    // read uploaded pdf
    const pdfBytes = fs.readFileSync(filePath)

    const pdfDoc = await PDFDocument.load(pdfBytes)

    // extract first page
    const newPdf = await PDFDocument.create()
    const [firstPage] = await newPdf.copyPages(pdfDoc, [0])
    newPdf.addPage(firstPage)

    const firstPageBytes = await newPdf.save()

    const firstPagePdf = `uploads/temp_first_${Date.now()}.pdf`
    fs.writeFileSync(firstPagePdf, firstPageBytes)

    // convert pdf → image
    const options = {
      format: "jpeg",
      out_dir: "uploads",
      out_prefix: "page",
      page: 1
    }

    // await pdfPoppler.convert(firstPagePdf, options)

    const imagePath = path.join("uploads", "page-1.jpg")

    // OCR
    const { data: { text } } = await Tesseract.recognize(imagePath, "eng")

    console.log("OCR Text:", text)

    // extract name
    const givenMatch = text.match(/Given\s*Name\s*([A-Z\s]+)/i)
    const surnameMatch = text.match(/Surname\s*([A-Z]+)/i)

    let fullName = "unknown"

    if (givenMatch && surnameMatch) {
      fullName = `${givenMatch[1]} ${surnameMatch[1]}`
    }

    fullName = fullName.trim().replace(/\s+/g, "_")

    const finalName = `application_receipt_${fullName}.pdf`
    const finalPath = path.join("uploads", finalName)

   

    fs.writeFileSync(finalPath, firstPageBytes)

    res.json({
      success: true,
      name: fullName,
      file: `/uploads/${finalName}`
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      error: "Processing failed"
    })
  }
})

export default app