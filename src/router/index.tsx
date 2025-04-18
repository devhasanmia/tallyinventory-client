import { createBrowserRouter } from "react-router";
import AdminDashboard from "../components/layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Brand from "../pages/Brand";
import Unit from "../pages/Unit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminDashboard />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "brand",
                element: <Brand />
            },
            {
                path: "unit",
                element: <Unit />
            },
            {
                path: "settings",
                element: <h1>Settings</h1>
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
]);

export default router