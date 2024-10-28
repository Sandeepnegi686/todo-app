import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="h-16 bg-indigo-300">
      <div className="conatiner max-w-4xl my-0 mx-auto h-full w-[90%]">
        <div className="flex justify-between items-center h-full">
          <a href="/" className="text-2xl font-light text-[#fff]">
            TODO
          </a>
          <div className="links">
            <NavLink
              to="/"
              className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
