import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("DB URL:", process.env.MONGODB_URL);
console.log("Connecting...");

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("✅ Connected Successfully");
  process.exit(0);
})
.catch((err) => {
  console.error("❌ Connection Error:");
  console.error(err);
  process.exit(1);
});