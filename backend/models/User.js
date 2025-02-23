import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    unique: true
  },
  totalDonations: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);





// import Joi from 'joi';
// const { boolean, string } = Joi; 

// import mongoose from "mongoose";

// const userShema = new mongoose.Schema({
//     name: {
//         type: String, require: true  
//     },
//     email: {
//         type: String, require: true 
//     },
//     password: {
//         type: String, require: true  
//     },
//     verifyOtp: {
//         type: String, default: " " 
//     },
//     verifyOtpExpireAt: {
//         type: Number, default: 0
//     },
//     isAccountVerified: {
//         type: Boolean, default: false  
//     },
//     resetOtp: {
//         type: String, default: " " 
//     },
//     resetOtpExpireAt: {
//         type: Number, default: 0
//     }
// });

// const userModel = mongoose.model.user || mongoose.model('user', userShema);

// export default userModel;

