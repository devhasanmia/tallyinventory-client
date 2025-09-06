import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { useGetUserQuery } from "../../redux/api/features/auth/authApi";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();
  const { data: userData } = useGetUserQuery("");

  const switchLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 w-full">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for small devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`
            bg-white shadow-sm z-50 
            ${isSidebarOpen ? "fixed" : "lg:static"} 
            top-0 left-0 right-0
          `}
        >
          <div className="flex items-center justify-between p-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
            </button>

            {/* Shop Info */}
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {userData?.data?.organizationName}
              </h1>
              <p className="text-xs text-gray-400">{userData?.data?.address}</p>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 px-3 py-1">
              <select
                value={i18n.language}
                onChange={(e) => switchLanguage(e.target.value)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 px-4 py-1.5 rounded-full hover:bg-blue-100 transition-all duration-200"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="hi">हिन्दी</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 overflow-x-hidden lg:mt-0 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
