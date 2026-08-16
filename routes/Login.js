import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // store hashed password

// Admin login route
app.post("/api/admin/login", async (req, res) => {

  const { email, password } = req.body;
  console.log(email, password);

  if (email !== ADMIN_EMAIL) return res.status(401).json({success:false, msg: "Unauthorized" });

  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) return res.status(401).json({success:false, msg: "Invalid password" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.json({ success:true, token });
});




export default app;