import { Outlet } from "react-router-dom";
import Navbar from "./navBar/Navbar";

console.log("Layout rendered");

export default function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
