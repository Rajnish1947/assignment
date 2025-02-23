import express from "express";
import { registerUser, loginUser, getUserProfile ,logoutUser} from "../controllers/Authcontrollers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", loginUser);

router.post("/logout", logoutUser);


// Get user profile (protected)
router.get("/profile", authMiddleware, getUserProfile);

export default router;




// import express from "express";
// import {register,login,logout} from  "../controllers/Authcontrollers.js"

//  const AuthRouter=express.Router();

//  http://localhost:4000/api/auth/register
//  AuthRouter.post('/register',register)
//  AuthRouter.post('/login',login)

//  AuthRouter.post('/logout',logout)

//  export default AuthRouter;

