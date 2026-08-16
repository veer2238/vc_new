
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    // Country Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // URL Slug
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // Asia / Europe / Middle East
    region: {
      type: String,
      required: true,
      enum: ["Asia", "Europe", "Middle East", "Others"],
    },

    // Hero Background Image
    image: {
      type: String,
      required: true,
    },

    // Local Flag SVG
    flag: {
      type: String,
      required: true,
    },

    // Visa Type
    visaType: {
      type: String,
      default: "E-VISA",
    },

    // 3-5 Working Days
    processingTime: {
      type: String,
      required: true,
    },

    // 4899
    fees: {
      type: Number,
      required: true,
    },

    // Required Documents
    documents: [
      {
        type: String,
      },
    ],

    // Dynamic guarantee (days)
    guaranteeDays: {
      type: Number,
      default: 10,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Country", countrySchema);