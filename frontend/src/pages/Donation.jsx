import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported in App.js

const Donation = () => {
  // Function to generate a unique reference code
  const generateReferenceCode = () => "DON" + Math.floor(1000 + Math.random() * 9000);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    referenceCode:"",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate donation amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("🚨 Donation amount must be greater than zero.");
      setLoading(false);
      return;
    }

    // Validate phone number format (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("📞 Enter a valid phone number (10-15 digits).");
      setLoading(false);
      return;
    }

    const donationData = {
      donorName: formData.name,
      donorEmail: formData.email.toLowerCase(),
      amount: amount,
      referralCode: formData.referenceCode,
    };

    try {
      const response = await fetch("https://assignment-z3c4.onrender.com/api/donate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();
      if (response.ok) {
        // Show SMS-style success toast
        alert(
          `📩 SMS: Dear ${formData.name}, thank you for your donation of $${formData.amount}! Ref Code: ${formData.referenceCode}. ❤️`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Reset the form and generate a new reference code
        setFormData({
          name: "",
          email: "",
          phone: "",
          amount: "",
          referenceCode: generateReferenceCode(),
        });
      } else {
        alert("❌ Failed to process donation: " + data.message);
      }
    } catch (error) {
      alert("⚠️ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Make a Donation</h2>
        <p className="text-gray-600 text-center mt-2">Your support can change lives!</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border mt-3 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border mt-3 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Donation Amount ($)"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            name="referenceCode"
            value={formData.referenceCode}
            onChange={handleChange}
            className="mt-3 w-full border border-gray-300 rounded-lg py-2 px-4 bg-gray-200"
            required
          />
          <button
            type="submit"
            className="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-bold py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit Donation"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Every contribution makes a difference. Thank you!
        </p>
      </div>
    </div>
  );
};

export default Donation;




