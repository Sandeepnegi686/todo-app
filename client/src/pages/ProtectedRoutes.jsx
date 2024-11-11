/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { user } = useAppContext();
  const navigate = useNavigate();
  // console.log(user);
  useEffect(
    function () {
      if (!user) {
        navigate("/register");
      }
    },
    [user, navigate]
  );

  return <>{children}</>;
}
