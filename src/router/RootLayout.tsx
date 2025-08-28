// src/layouts/RootLayout.tsx
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
