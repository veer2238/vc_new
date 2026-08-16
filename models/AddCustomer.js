import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true, // e.g. "Passport", "Visa"
//     },
//     applicationType: {
//       type: String,
//       required: true, // e.g. "New", "Renewal"
//     },
//     remarks: {
//       type: String,
//       default: "", // optional notes
//       trim: true,
//     },
//   },
//   { _id: false } // Prevent automatic _id creation for each service
// );

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, trim: true },
    attendedBy: {
      type: String,
      enum: ["Veer", "Paresh Patel"],
      default: "Veer",
    },
    leadSource: {
      type: String,
      enum: [
        "Walk-in",
        "Call",
        "Website",
        "WhatsApp",
        "Reference",
        "Existing Customer",
        "Other",
      ],
      default: "Call",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);


const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
