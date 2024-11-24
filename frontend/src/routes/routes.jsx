import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home";
import AllProduct from "../pages/AllProduct";
import SingleProduct from "../pages/SingleProduct";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/products",
            element: <AllProduct/>
        },
        {
            path: "/product/:id",
            element: <SingleProduct/>
        },
      ]
    },
    
  ]);