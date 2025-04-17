import { useState } from "react";
import { getTodayDate } from "../../../utils/date/getTodayDate";
import {
  HiOutlineClipboardDocumentList,
  HiSquare3Stack3D,
} from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { LuSettings, LuUserPlus } from "react-icons/lu";
import {
  MdManageAccounts,
  MdMenuBook,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { IoBagAdd, IoPeopleSharp } from "react-icons/io5";
import { ImQrcode } from "react-icons/im";
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { Link } from "react-router";

const items = [
  {
    icon: <AiFillDashboard />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <AiFillDashboard />,
    label: "Sale",
    link: "/dashboard",
  },
  {
    icon: <AiFillProduct />,
    label: "Product Management",
    subItems: [
      { label: "Add Product", icon: <IoBagAdd />, link: "/add-product" },
      {
        label: "Product List",
        icon: <HiSquare3Stack3D />,
        link: "/product-list",
      },
      { label: "Print Labels", icon: <ImQrcode />, link: "/print-labels" },
      {
        label: "Trending Product",
        icon: <MdOutlineWorkspacePremium />,
        link: "/print-labels",
      },
    ],
  },
  {
    icon: <MdManageAccounts />,
    label: "Customer Management",
    subItems: [
      { label: "Add Customer", icon: <LuUserPlus />, link: "/add-customer" },
      {
        label: "Customer List",
        icon: <IoPeopleSharp />,
        link: "/customer-list",
      },
      {
        label: "Customer Due Report",
        icon: <MdMenuBook />,
        link: "/customer-due",
      },
    ],
  },
  {
    label: "Categories",
    icon: <HiOutlineClipboardDocumentList />,
    link: "/category-management",
  },
  {
    label: "Brands",
    icon: <HiSquare3Stack3D />,
    link: "/brand",
  },
  {
    label: "Units",
    icon: <HiSquare3Stack3D />,
    link: "/unit",
  },
  {
    icon: <TbReportAnalytics />,
    label: "Report",
    link: "/report",
  },
  {
    icon: <LuSettings />,
    label: "Settings",
    link: "/settings",
  },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
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
              src="/profile.jpg"
              alt="Admin"
              className="w-16 h-16 rounded-full border-2 border-blue-600 object-cover shadow-lg"
            />
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h1 className="font-bold text-blue-300">MD. HASAN MIA</h1>
            <p className="text-sm text-gray-300">
              <span className="text-white">Business Owner</span>
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
        <a
          href="#"
          className="flex items-center justify-center p-1 w-full rounded-lg bg-gray-800 hover:bg-red-600/30 transition-all duration-200 group"
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
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
