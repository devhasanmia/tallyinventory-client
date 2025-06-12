import { useState } from "react";
import { getTodayDate } from "../../../utils/date/getTodayDate";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getMenuItems } from "./menuItems";
import { useGetUserQuery } from "../../../redux/api/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/api/features/auth/authSlice";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation();
  const items = getMenuItems(t);
  const { data: userData } = useGetUserQuery("");
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const nagivate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    nagivate("/login");
  };
  return (
    <aside
      id="sidebar"
      className={`bg-slate-900 text-white ${
        isOpen ? "w-64" : "w-0"
      } flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-xl`}
    >
      {/* Top: Profile */}
      <div>
        <div className="p-6 border-b border-gray-700 flex items-center space-x-4">
          <div className="relative">
            <img
              src={`${userData?.data?.photo}`}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-blue-600 object-cover shadow-lg"
            />
            <span
              className={`absolute bottom-1 right-1 w-3 h-3 border-2 border-slate-900 rounded-full animate-pulse ${
                userData?.data?.verification === "verified"
                  ? "bg-green-500"
                  : userData?.data?.verification === "unverified"
                  ? "bg-red-500"
                  : "bg-yellow-400"
              }`}
            ></span>
          </div>
          <div>
            <h1 className="font-bold text-blue-300">{userData?.data?.name}</h1>
            <p className="text-sm text-gray-300">
              <span className="text-white">{userData?.data?.designation}</span>
            </p>
            <p className="text-xs text-gray-400">{getTodayDate()}</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 space-y-2">
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
                      className="flex items-center justify-between w-full p-4 hover:bg-gray-700/50 focus:outline-none group"
                    >
                      <span className="flex items-center">
                        <span className="mr-3 text-lg group-hover:text-blue-400">
                          {item.icon}
                        </span>
                        {item.label}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openSubmenuIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                        openSubmenuIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      {item.subItems.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          to={sub.link}
                          className="flex items-center pl-12 p-4 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition group"
                        >
                          <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                            {sub.icon}
                          </span>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={`${item?.link}`}
                    className="flex items-center p-4 hover:bg-gray-700/50 group"
                  >
                    <span className="mr-3 text-lg group-hover:text-blue-400">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Logout */}
      <div className="p-4 border-t border-gray-700 flex justify-center">
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-center p-1 w-full rounded-lg bg-gray-800 hover:bg-red-600/30 transition-all duration-200 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-red-400 group-hover:text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6A2.25 2.25 0 018.25 18.75V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          <span className="text-lg font-semibold text-red-400 group-hover:text-red-500 p-2">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
