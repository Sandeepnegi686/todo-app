import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full min-h-full">
      <Navigation />
      <Outlet />
    </div>
  );
}
