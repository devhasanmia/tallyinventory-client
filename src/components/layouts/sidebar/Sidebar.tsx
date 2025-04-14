import { useState } from "react";
import { getTodayDate } from "../../../utils/date/getTodayDate";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    return (
        <aside
            id="sidebar"
            className={`bg-slate-900 text-white ${isOpen ? 'w-64' : 'w-0'
                } h-screen flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-xl`}
        >
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
                        <p className="text-sm text-gray-300"><span className="text-white">Business Owner</span></p>
                        <p className="text-xs text-gray-400">{getTodayDate()}</p>
                    </div>
                </div>
                <nav className="mt-4 space-y-2">
                    <a href="#" className="flex items-center p-4 hover:bg-gray-700/50 group">
                        <svg className="w-5 h-5 mr-3 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3m10-11l2 2v10h-3m-6 0h6" />
                        </svg>
                        Dashboard
                    </a>

                    {/* Products with Submenu */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setSubmenuOpen(!isSubmenuOpen)}
                            className="flex items-center justify-between w-full p-4 hover:bg-gray-700/50 focus:outline-none group"
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-3 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m5 4h6m-3-3v6" />
                                </svg>
                                Products
                            </span>
                            <svg className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isSubmenuOpen ? 'max-h-40' : 'max-h-0'}`}>
                            <a href="#" className="flex items-center pl-12 p-4 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition group">
                                <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Product
                            </a>
                            <a href="#" className="flex items-center pl-12 p-4 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition group">
                                <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Customer
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700 flex justify-center">
                <a href="#" className="flex items-center justify-center p-1 w-full rounded-lg bg-gray-800 hover:bg-red-600/30 transition-all duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-400 group-hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6A2.25 2.25 0 018.25 18.75V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span className="text-lg font-semibold text-red-400 group-hover:text-red-500 p-2">Logout</span>
                </a>
            </div>
        </aside>
    )
}

export default Sidebar