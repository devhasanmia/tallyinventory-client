import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";

const AuthLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // localStorage থেকে darkMode নেবে
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // যদি কিছু না থাকে তাহলে system preference check করবে
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }

    // window resize handle
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // darkMode পরিবর্তন হলে localStorage এ save হবে
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} overflow-auto`}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Sidebar
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
          onClose={() => setSidebarCollapsed(true)}
          onToggle={toggleSidebar}
        />
        <div
          className="flex-1 flex flex-col transition-all duration-300"
          style={{
            marginLeft: isMobile ? 0 : sidebarCollapsed ? 64 : 256,
          }}
        >
          <TopNavigation
            onToggleSidebar={toggleSidebar}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            collapsed={sidebarCollapsed}
          />

          <main className="flex-1 p-6 mx-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-300 w-full">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default AuthLayout;
