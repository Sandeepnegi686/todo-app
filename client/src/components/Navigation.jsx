import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

export default function Navigation() {
  const { user, logoutUser } = useAppContext();

  return (
    <nav className="h-16 bg-indigo-300">
      <div className="conatiner max-w-4xl my-0 mx-auto h-full w-[90%]">
        <div className="flex justify-between items-center h-full">
          <a href="/" className="text-2xl font-light text-[#fff]">
            TODO
          </a>
          <div className="links flex justify-center items-center">
            <NavLink
              to="/"
              className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/profile"
                className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
              >
                Profile
              </NavLink>
            )}
            {user ? (
              <NavLink
                to="/"
                className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
                aria-label="logout"
                aria-labelledby="logout"
                onClick={logoutUser}
              >
                <img src="/logout.svg" alt="logout" className="w-4 h-4" />
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className="px-4 text-lg font-normal hover:text-gray-600 transition ease-in-out duration-300"
              >
                Login
              </NavLink>
            )}
            {user && (
              <Avatar sx={{ width: 30, height: 30, bgcolor: deepPurple[500] }}>
                {user?.name[0]}
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
