import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique payment IDs

export const donate = async (req, res) => {
  try {
    const { donorName, donorEmail, amount, referralCode } = req.body;

    // Validate required fields
    if (!donorName || !donorEmail || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount." });
    }

    // Generate a unique payment ID (simulating real transaction)
    const paymentId = uuidv4();

    // Create a new transaction
    const newTransaction = new Transaction({
      donorName,
      donorEmail,
      amount,
      referralCode,
      paymentId,
      status: "Success",
    });

    await newTransaction.save();

    // Update total donations for the user with this referral code
    if (referralCode) {
      const user = await User.findOne({ referralCode });
      if (user) {
        user.totalDonations += amount;
        await user.save();
      }
    }

    return res.status(200).json({
      message: "Donation successful",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Donation error:", error);
    return res.status(500).json({ message: "Server error" });
  }

  
};
export const getAllDonors = async (req, res) => {
  try {
    // Fetch all donors from the Transaction collection
    const donors = await Transaction.find().sort({ createdAt: -1 });

    if (!donors || donors.length === 0) {
      return res.status(404).json({ message: "No donors found." });
    }

    return res.status(200).json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


