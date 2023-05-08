import { onAuthStateChanged } from "firebase/auth";
import { createContext, memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import { auth } from "../firebase/config";

export const UserContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState();
  const location = useLocation();

  useEffect(() => {
    const clean = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInfo(user);
        if (location.pathname === config.routes.login) {
          navigate(-1);
        }
      } else {
      }
    });
    return () => {
      clean();
    };
  }, []);

  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
}

export default memo(AuthProvider);
