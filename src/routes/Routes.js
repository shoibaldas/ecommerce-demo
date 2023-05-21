import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Profile from "../pages/Profile/Profile";
import AllProduct from "../pages/AllProduct/AllProduct";
import ShoppingCartDetails from "../pages/ShoppingCartDetails/ShoppingCartDetails";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(`https://fakestoreapi.com/products/${params.id}`),
      },
      {
        path: "/products",
        element: <AllProduct></AllProduct>,
      },
      {
        path: "/mycart",
        element: <ShoppingCartDetails></ShoppingCartDetails>,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoutes>
            <UserDashboardLayout></UserDashboardLayout>
          </PrivateRoutes>
        ),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/my-profile",
            element: (
              <PrivateRoutes>
                <Profile></Profile>
              </PrivateRoutes>
            ),
          },
          {
            path: "/my-profile/order-history",
            element: (
              <PrivateRoutes>
                <OrderHistory></OrderHistory>
              </PrivateRoutes>
            ),
          },
        ],
      },
    ],
  },
]);
