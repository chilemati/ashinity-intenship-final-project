// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Cart = lazy(() => import("../pages/Cart"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Account = lazy(() => import("../pages/Account"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));


export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },

  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "wishlist",
    element: <Wishlist />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "product/:id",
    element: <ProductDetails />,
  },
]);
