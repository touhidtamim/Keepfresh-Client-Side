import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Spinner from "../Components/Spinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (user) {
        const token = localStorage.getItem("access-token");
        if (!token) {
          setCheckingToken(false);
          return;
        }

        try {
          const res = await fetch(
            "https://your-server-domain.com/verify-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();
          if (data.valid) {
            setCheckingToken(false);
          } else {
            localStorage.removeItem("access-token");
            setCheckingToken(false);
          }
        } catch (error) {
          console.error("Token verify failed:", error);
          localStorage.removeItem("access-token");
          setCheckingToken(false);
        }
      } else {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [user]);

  if (loading || checkingToken) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
