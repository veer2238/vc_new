
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "General",
        "Student Visa",
        "Tourist Visa",
        "Visitor Visa",
        "Work Visa",
        "Business Visa",
        "Passport",
        "Apply In All",
      ],
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;