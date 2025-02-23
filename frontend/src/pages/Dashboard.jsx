import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem("userName", data.name);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const copyDonationLink = () => {
    if (user) {
      const donationLink = `${window.location.origin}/donation`;
      navigator.clipboard.writeText(donationLink);
      alert("Donation link copied to clipboard!");
    }
  };

  const shareOnWhatsApp = () => {
    if (user) {
      const fullDonationLink = `${window.location.origin}/donation`;
      const referralCode = user.referralCode;
      const message = `I am volunteering with NayePankh Foundation... 🔗 Donate Here: ${fullDonationLink} 🎯 Use Referral Code: ${referralCode}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  if (loading) return <div>Loading...</div>;

  const bgImage1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIZ6pnxeaDiKY1DwdKOCXqOb-UIVB3Fnl30w&s";
  const bgImage2 = "https://st2.depositphotos.com/1171712/10351/i/450/depositphotos_103518718-stock-photo-image-of-human-hand-giving.jpg";

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </div>
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full p-4 md:ml-52">
        <Header />

        {/* First Section */}
        <div className="relative h-[50vh] md:h-[95vh] bg-cover bg-center flex items-center justify-center text-white text-center px-4 ml-4" style={{ backgroundImage: `url(${bgImage2})` }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative">
            <h1 className="text-xl md:text-2xl font-bold text-red-500">Hello {user?.name || "User"}</h1>
            <p className="mt-4 text-base md:text-xl">Apni madad se kisi ki zindagi badlein, aaj hi daan karein!</p>
          </div>
        </div>

        {/* Second Section */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow-lg text-white text-center bg-opacity-80" style={{ backgroundImage: `url(${bgImage1})` }}>
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-red-500">
              <p className="text-lg md:text-xl font-bold">Total Goal</p>
              <p className="mt-2 text-md md:text-lg font-bold">10</p>
            </div>
            <hr className="my-4 border-gray-500 mx-auto w-3/4" />
            <p className="text-sm md:text-lg">Goal Achievement: 3000</p>
            <button onClick={shareOnWhatsApp} className="mt-4 bg-red-500 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"><i class="fa-solid fa-arrow-up-from-bracket"></i> Share on WhatsApp</button>
          </div>

          <div className="p-6 rounded-lg shadow-lg text-white text-center bg-opacity-80" style={{ backgroundImage: `url(${bgImage1})` }}>
            <p className="text-lg md:text-xl font-bold">Level Achievement: Star</p>
            <hr className="my-4 border-gray-500 mx-auto w-3/4" />
            <button className="mt-4 bg-red-500 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"><i class="fa-solid fa-star"></i> Reward</button>
            <button onClick={copyDonationLink} className="mt-4 bg-red-500 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded m-4"><i class="fa-solid fa-copy"></i> Copy Donation Link</button>
            <p className="mt-4">Unlock Ninja Level at 5000</p>
            <hr className="my-4 border-gray-500 mx-auto w-3/4" />
            <p>Reference Code: {user?.referralCode || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

