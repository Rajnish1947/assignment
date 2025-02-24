import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://assignment-z3c4.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <Link to={'/login'} type="button" class="btn btn-primary"> <i class="fa-solid fa-arrow-left"></i>  Back</Link>
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>
        <p className="text-gray-500 text-center">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" required placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} required placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-10" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"} text-white font-semibold py-2 rounded-lg shadow-md transition duration-300`}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-500 font-semibold hover:underline">Login here</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

