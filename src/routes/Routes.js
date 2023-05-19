import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
        path:"/login",
        element: <Login></Login>
      },
      {
        path:"/signup",
        element:<Signup></Signup>
      },
      {
        path:"/product/:id",
        element:<ProductDetails></ProductDetails>,
        loader : ({params}) => fetch (`https://fakestoreapi.com/products/${params.id}`)
      }
    ],
  },
]);
