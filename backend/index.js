import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"
import donationRoutes from "./routes/donationRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Adjust as needed
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donate", donationRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv/config";
// import cookieParser from "cookie-parser";
// import DBconnect from "./config/db.js";
// import AuthRouter from "./routes/Authroutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Middleware for parsing JSON and cookies
// app.use(express.json());
// app.use(cookieParser());

// // Configure CORS to allow requests from your frontend only
// app.use(cors({
//   origin: "http://localhost:5173", // Replace with your frontend URL if different
//   credentials: true,
// }));

// // Connect to the database
// DBconnect();

// // API Endpoints
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });
// app.use("/api/auth", AuthRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


