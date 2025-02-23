import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendWelcomeEmail from "../config/nodemailer.js";

// Helper function to generate a unique referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create referral code
    const referralCode = generateReferralCode();

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode
    });

    await newUser.save();

    // Optionally send welcome email
    await sendWelcomeEmail(email, name);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from "../models/usersModel.js";
// import sendWelcomeEmail from "../config/nodemailer.js"

// //this methode for signup or register
// export const register = async (req, res) => {
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//         return res.json({ success: false, message: 'Missing details' });
//     }

//     try {
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.json({ success: false, message: 'User already exists' });
//         }
        
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new userModel({ name, email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET, { expiresIn: "7d" });

//         // Send token as a cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.Node_envrn === 'production',
//             sameSite: process.env.Node_envrn === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });

// // this for send this emai to user
// // const mailOption={
// //     from:process.env.SENDER_EMAIL,
// //     to:email,
// //     subject:'welcome to from rajnish',
// //     text:`Welcome to on rejnish website your Account is created with email id:${email}`
// // }

// // await transporter(mailOption)

// await sendWelcomeEmail(email, name);



//         return res.json({ success: true, message: 'User registered successfully' });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };



// //this methode for login

// export const login = async (req, res) => {
//     const { email, password } = req.body;
    
//     // Check if email and password are provided
//     if (!email || !password) {
//         return res.json({ success: false, message: 'Missing details' });
//     }

//     try {
//         // Find the user by email
//         const user = await userModel.findOne({ email });
        
//         // If no user found
//         if (!user) {
//             return res.json({ success: false, message: 'User not found' });
//         }

//         // Check if the password is correct
//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             return res.json({ success: false, message: 'Invalid password' });
//         }

//         // Generate a token for the logged-in user
//         const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET, { expiresIn: "7d" });

//         // Send token as a cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.Node_envrn === 'production',
//             sameSite: process.env.Node_envrn === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//         });

//         return res.json({ success: true, message: 'Login successful' });

//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };
//  //this medhode for log out

//  export const logout = (req, res) => {
//     try {
//         // Clear the cookie
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure: process.env.Node_envrn === 'production',
//             sameSite: process.env.Node_envrn === 'production' ? 'none' : 'strict'
//         });

//         return res.json({ success: true, message: 'Logged out successfully' });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };
