import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div>
      <ul>
        <li>
          <button onClick={handleLoginClick}>login</button>
        </li>
        <li>
          <button onClick={handleLogoutClick}>logout</button>
        </li>
      </ul>
      <h3>User is {isAuthenticated ? "logged in" : "not logged in"}</h3>
      {isAuthenticated && (
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Home;
