import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user?.name) {
        // console.log("no user");
        navigate("/register");
      }
    },
    [user, navigate]
  );

  return <>{children}</>;
}
