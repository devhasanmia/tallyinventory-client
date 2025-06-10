import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../pages/Loading";
import AdminDashboard from "../components/layouts/AdminLayout";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import OtpVerify from "../pages/auth/OtpVerify";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import OtpProtectedRoute from "../components/layouts/OtpVerificationProtector";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Brand = lazy(() => import("../pages/Brand"));
const Unit = lazy(() => import("../pages/Unit"));
const AddCustomer = lazy(() => import("../pages/customer/AddCustomer"));
const CustomerList = lazy(() => import("../pages/customer/CustomerList"));
const CategoryList = lazy(() => import("../pages/categories/CategoryList"));
const ProductForm = lazy(() => import("../pages/products/addProduct"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                    <AdminDashboard />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "/add-customer",
                element: (
                    <Suspense fallback={<Loading />}>
                        <AddCustomer />
                    </Suspense>
                ),
            },
            {
                path: "/customer-list",
                element: (
                    <Suspense fallback={<Loading />}>
                        <CustomerList />
                    </Suspense>
                ),
            },
            {
                path: "/category-management",
                element: (
                    <Suspense fallback={<Loading />}>
                        <CategoryList />
                    </Suspense>
                ),
            },
            {
                path: "/add-product",
                element: (
                    <Suspense fallback={<Loading />}>
                        <ProductForm />
                    </Suspense>
                ),
            },
            {
                path: "brand",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Brand />
                    </Suspense>
                ),
            },
            {
                path: "unit",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Unit />
                    </Suspense>
                ),
            },
            {
                path: "settings",
                element: <h1>Settings</h1>,
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotFound />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        )
    },
    {
        path: "/registration",
        element: (
            <Suspense fallback={<Loading />}>
                <Registration />
            </Suspense>
        )
    },
    {
        path: "/otp-verify",
        element: (
            <OtpProtectedRoute>
                <Suspense fallback={<Loading />}>
                    <OtpVerify />
                </Suspense>
            </OtpProtectedRoute>
        )
    }
]);

export default router;
