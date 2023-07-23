import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const {
    isAuthenticated: auth0IsAuthenticated,
    user: auth0User,
    logout: auth0Logout,
  } = useAuth0();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user data is in the cookies when the component mounts
    const savedUser = Cookies.get("user");
    const savedIsAuthenticated = Cookies.get("isAuthenticated");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(savedIsAuthenticated));
    }
  }, []);

  useEffect(() => {
    // If the Auth0 isAuthenticated state changes, update the local state and the cookies
    if (auth0IsAuthenticated) {
      Cookies.set("user", JSON.stringify(auth0User));
      Cookies.set("isAuthenticated", JSON.stringify(auth0IsAuthenticated));
      setUser(auth0User);
      setIsAuthenticated(auth0IsAuthenticated);
    }
  }, [auth0User, auth0IsAuthenticated]);

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("isAuthenticated");
    setUser(null);
    setIsAuthenticated(false);
    auth0Logout();
  };

  return { user, isAuthenticated, logout };
};

export default useAuth;
