import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

  return (
      <div className="my-28 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl shadow-lg">
       <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white w-56 p-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {/* Sidebar content */}
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <ul>
            <li className="mb-2">
              <Link to="/my-profile" className="text-blue-300 hover:text-blue-200">
                My Info
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/my-profile/order-history" className="text-blue-300 hover:text-blue-200">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-white p-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4"
            onClick={toggleSidebar}
          >
            {isOpen ? "Hide Sidebar" : "Open Sidebar"}
          </button>
          <Outlet></Outlet>
        </div>
      </div>
      </div>
  );
};

export default UserDashboardLayout;
