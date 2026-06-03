import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import About from "../pages/home/About";
import ContactPage from "../pages/home/ContactPage";
import CartPage from "../pages/cart/CartPage";
import DashboardLayout from "../pages/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";
import Overview from "../pages/dashboard/Overview";
import Profile from "../pages/dashboard/Profile";
import Payments from "../pages/dashboard/Payments";
import Reviews from "../pages/dashboard/Reviews";
import Orders from "../pages/dashboard/Orders";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ManageProducts from "../pages/dashboard/ManageProducts";
import ManageOrders from "../pages/dashboard/ManageOrders";
import AddNewPost from "../pages/dashboard/AddNewPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/cart", element: <PrivateRoute><CartPage /></PrivateRoute> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "user", element: <Overview /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "payments", element: <Payments /> },
      { path: "profile", element: <Profile /> },
      { path: "reviews", element: <Reviews /> },
      { path: "orders", element: <Orders /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "manage-orders", element: <ManageOrders /> },
      { path: "add-new-post", element: <AddNewPost /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
  