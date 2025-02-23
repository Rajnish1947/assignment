import express from "express";
import { donate,getAllDonors } from "../controllers/donationController.js";

const router = express.Router();

// Donation endpoint
router.post("/", donate);
router.get("/donors", getAllDonors);

export default router;

