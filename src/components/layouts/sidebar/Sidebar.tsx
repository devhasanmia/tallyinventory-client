import { useState } from "react";
import { getTodayDate } from "../../../utils/date/getTodayDate";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getMenuItems } from "./menuItems";
import { useGetUserQuery } from "../../../redux/api/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/api/features/auth/authSlice";
import { FiChevronDown, FiChevronRight, FiLogOut } from "react-icons/fi";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation();
  const items = getMenuItems(t);
  const { data: userData } = useGetUserQuery("");
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      id="sidebar"
      className={`bg-white text-gray-800 ${
        isOpen ? "w-64" : "w-0"
      } flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-lg border-r border-gray-200`}
    >
      {/* Top: Profile */}
      <div>
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="relative">
            {userData?.data?.photo ? (
              <img
                src={userData.data.photo}
                alt="Profile"
                className="w-12 h-12 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${
                userData?.data?.verification === "verified"
                  ? "bg-green-500"
                  : userData?.data?.verification === "unverified"
                  ? "bg-red-500"
                  : "bg-yellow-400"
              }`}
            />
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {userData?.data?.name || "User"}
            </p>
            <p className="text-sm text-gray-500">
              {userData?.data?.designation || "No position"}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 space-y-1 px-2">
          {items.map((item, index) => {
            const hasSubmenu = item.subItems && item.subItems.length > 0;
            return (
              <div key={index} className="space-y-1">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenSubmenuIndex(
                          openSubmenuIndex === index ? null : index
                        )
                      }
                      className={`flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-50 focus:outline-none transition-colors duration-200 ${
                        openSubmenuIndex === index
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      <span className="flex items-center">
                        <span
                          className={`mr-3 text-lg ${
                            openSubmenuIndex === index
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </span>
                      {openSubmenuIndex === index ? (
                        <FiChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <FiChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <div
                      className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out pl-4 ${
                        openSubmenuIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      {item.subItems.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          to={sub.link}
                          className="flex items-center p-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                        >
                          <span className="mr-2 text-gray-400 group-hover:text-blue-500">
                            {sub.icon}
                          </span>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={`${item?.link}`}
                    className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <span className="mr-3 text-lg text-gray-500 group-hover:text-blue-500">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group"
        >
          <FiLogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500 mr-2" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
