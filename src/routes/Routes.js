import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Profile from "../pages/Profile/Profile";
import AllProduct from "../pages/AllProduct/AllProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        path: "/my-profile",
        element: <UserDashboardLayout></UserDashboardLayout>,
        children: [
          {
            path: "/my-profile",
            element: <Profile></Profile>,
          },
        ],
      },
    ],
  },
]);
