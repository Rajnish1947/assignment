import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Transaction = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch donors from API
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donate/donors");
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full relative">
      {/* Sidebar Toggle Button on Hover */}
      <div 
        className="absolute top-4 left-4 md:hidden z-50 p-2 bg-gray-800 text-white rounded hover:block"
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <FiMenu size={24} />
      </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex`}> 
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:ml-56 w-full overflow-hidden">
        <Header />

        {/* Transaction Table */}
        <div className="overflow-x-auto ml-4 bg-white shadow-md rounded-lg mt-4 w-full">
          <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm md:text-base min-w-full md:min-w-[600px]">
            <thead className="bg-gray-100">
              <tr className="text-xs sm:text-sm md:text-base">
                <th className="border border-gray-500 p-2">ID</th>
                <th className="border border-gray-500 p-2">Name</th>
                <th className="border border-gray-500 p-2">Transaction ID</th>
                <th className="border border-gray-500 p-2">Amount</th>
                <th className="border border-gray-500 p-2">Status</th>
                <th className="border border-gray-500 p-2">Date</th>
                <th className="border border-gray-500 p-2">Pancard</th>
              </tr>
            </thead>
            <tbody className="text-center text-xs sm:text-sm md:text-base">
              {loading ? (
                <tr>
                  <td colSpan="7" className="border p-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : donors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="border p-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                donors.map((donor, index) => (
                  <tr key={donor._id} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2 break-words max-w-[100px] md:max-w-[150px] overflow-hidden truncate">{donor.donorName}</td>
                    <td className="border border-gray-300 p-2 break-words max-w-[150px] md:max-w-[200px] overflow-hidden truncate">{donor._id}</td>
                    <td className="border border-gray-300 p-2">
                      ${donor.amount.toFixed(2)}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 font-semibold ${
                        donor.status === "Success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {donor.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(donor.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2 break-words max-w-[100px] md:max-w-[150px] overflow-hidden truncate">
                      {donor.pancard || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
