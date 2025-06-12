import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loading from "../pages/Loading";
import AdminDashboard from "../components/layouts/AdminLayout";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import OtpVerify from "../pages/auth/OtpVerify";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import OtpProtectedRoute from "../components/layouts/OtpVerificationProtector";
import ProductList from "../pages/products/ProductList";

// Lazy-loaded pages
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Brand = lazy(() => import("../pages/Brand"));
const Unit = lazy(() => import("../pages/Unit"));
const AddCustomer = lazy(() => import("../pages/customer/AddCustomer"));
const CustomerList = lazy(() => import("../pages/customer/CustomerList"));
const CategoryList = lazy(() => import("../pages/categories/CategoryList"));
const AddCategory = lazy(() => import("../pages/categories/AddCategory"));
const ProductForm = lazy(() => import("../pages/products/addProduct"));

const withSuspense = (component: React.ReactNode) => (
  <Suspense fallback={<Loading />}>{component}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>{withSuspense(<AdminDashboard />)}</ProtectedRoute>
    ),
    children: [
      { path: "", element: withSuspense(<Dashboard />) },
      { path: "dashboard", element: withSuspense(<Dashboard />) },
      { path: "add-customer", element: withSuspense(<AddCustomer />) },
      { path: "customer-list", element: withSuspense(<CustomerList />) },

      {
        path: "category",
        children: [
          { path: "", element: withSuspense(<CategoryList />) }, // /category
          { path: "add-category", element: withSuspense(<AddCategory />) }, // /category/add-category
        ],
      },
      {
        path: "product-management",
        children: [
          { path: "", element: withSuspense(<ProductList />) },
          { path: "add-product", element: withSuspense(<ProductForm />) },
        ],
      },
      { path: "brand", element: withSuspense(<Brand />) },
      { path: "unit", element: withSuspense(<Unit />) },
      { path: "settings", element: <h1>Settings</h1> },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/registration",
    element: withSuspense(<Registration />),
  },
  {
    path: "/otp-verify",
    element: (
      <OtpProtectedRoute>{withSuspense(<OtpVerify />)}</OtpProtectedRoute>
    ),
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);

export default router;
