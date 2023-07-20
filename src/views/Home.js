import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      employeeExistsInDatabase();
      navigate("/dashboard");
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
    let numberString
    let parts = input.split("|");
    if (parts.length === 1) {
      numberString = parts[0];
    } else if (parts.length === 2) {
      numberString = parts[1];
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/id/${numberString}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        try {
          const params = new URLSearchParams();
          params.append("employeeId", numberString);
          params.append("name", user.nickname);
          params.append("email", user.email);
          params.append("companyId", "1");

          const response = await axios.put(
            "http://localhost:8080/add/employee",
            params.toString()
          );
          console.log("Employee added successfully:", response.data);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.log("Bad request:", error.response.data);
          } else if (error.response && error.response.status === 404) {
            console.log("Company not found:", error.response.data);
          } else {
            console.log("An error occurred:", error.message);
          }
        }
      } else {
        console.log("An error occurred:", error.message);
      }
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
