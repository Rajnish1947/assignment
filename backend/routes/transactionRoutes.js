import express from "express";
import { getUserTransactions } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get transactions (protected)
router.get("/", authMiddleware, getUserTransactions);

export default router;

