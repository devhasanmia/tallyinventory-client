import { createBrowserRouter } from "react-router";
import AdminDashboard from "../components/layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Brand from "../pages/Brand";
import Unit from "../pages/Unit";
import AddCustomer from "../pages/customer/AddCustomer";
import CustomerList from "../pages/customer/CustomerList";
import CategoryList from "../pages/categories/CategoryList";
import ProductForm from "../pages/products/addProduct";

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
                path: "",
                element: <Dashboard />
            },
            {
                path: "/add-customer",
                element: <AddCustomer/>
            },
            {
                path: "/customer-list",
                element: <CustomerList/>
            },
            {
                path: "/category-management",
                element: <CategoryList/>
            },
            {
                path: "/add-product",
                element: <ProductForm/>
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