import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getUserTransactions = async (req, res) => {
  try {
    // Get the user's referral code
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactions = await Transaction.find({ referralCode: user.referralCode })
      .sort({ createdAt: -1 });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

