import mongoose from "mongoose";

const passportFormSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
}, { timestamps: true });

const PassportForm = mongoose.model("PassportForm", passportFormSchema);

export default PassportForm;
