import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  donorEmail: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  referralCode: {
    type: String,
    default: ''
  },
  Number: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Success'
  }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);

