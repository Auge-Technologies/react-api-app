import React, {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
     if ( employeeExistsInDatabase()) {
       console.log("hei")
     }
      //navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  const employeeExistsInDatabase = async () => {
    let input = user.sub;
    let parts = input.split("|");
    let numberString = parts[1];
    try {
      const response = await axios.get(
          `http://localhost:8080/employee/id/${numberString}`
      );
      console.log(response.data)
      console.log(response.data.sub)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

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
