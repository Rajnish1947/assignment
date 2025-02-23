import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { BsFillCaretDownFill } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    setUser(storedUser ? storedUser.toUpperCase() : null);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("referralCode");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="flex py-3 px-6  shadow-md sticky top-0 z-50 items-center">
     

      <div className="relative ml-auto" ref={dropdownRef}>
        {user ? (
          <div className="flex items-center gap-3">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user}
              <BsFillCaretDownFill className="ml-2 h-5 w-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                >
                  <RxExit className="mr-2 h-5 w-5 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow transition duration-300 ">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;








