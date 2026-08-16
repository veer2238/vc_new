import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import Faq from './routes/Faq.js';
import News from './routes/News.js';
import Contact from './routes/Contact.js';
import Reminder from './routes/Reminder.js';
import Login from './routes/Login.js';
import Addcustomer from './routes/AddCustomer.js';
import countryRoutes from "./routes/country.js"
// import passportReceiptRoute from "./routes/passportReceipt.js"
import ConsultationRoute from "./routes/ConsultationRoute.js";
import ConsultationModalRoute from "./routes/ConsultationModalRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js";
import path from "path"

dotenv.config();
console.log("DB URL:", process.env.MONGODB_URL);
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))


const DB = process.env.MONGODB_URL;

// MongoDB Connection
mongoose.connect(DB)
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error(' MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/',Faq)
app.use('/', News);
app.use('/',Contact)
app.use('/', Login);
app.use('/', Reminder); 
app.use('/', Addcustomer);
app.use("/", countryRoutes)
// app.use("/", passportReceiptRoute)
app.use("/", ConsultationRoute);
app.use("/", ConsultationModalRoute);
app.use("/", ReviewRoute);

// console.log(bcrypt.hashSync("Veer@0409", 10))


// Start Server
app.listen(4032, () => {
  console.log(' Server is running on port 4032');
});
