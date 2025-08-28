// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "./RootLayout";

const Checkout = lazy(() => import("@/pages/Checkout"));
const NotFound = lazy(() => import("@/pages/NotFound"));
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
    element: <RootLayout />, // 👈 Add layout wrapper
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
      { path: "account", element: <Account /> },
      { path: "checkout", element: <Checkout /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "*", element: <NotFound /> }, // 404 fallback
    ],
  },
]);
