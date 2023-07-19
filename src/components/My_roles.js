import { useEffect, useState } from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

const My_roles = (props) => {
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    let input = user.sub;
    let parts = input.split("|");
    let numberString = parts[1];
    setUserId(numberString);
  }, [props.userId]);

  useEffect(() => {
    fetchEmployeeRoles(userId);
  }, [userId]);

  const fetchEmployeeRoles = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/roles/${userId}`
      );
      const rolesData = response.data;

      const uniqueRoles = rolesData.reduce((acc, role) => {
        if (!acc.find((item) => item.name === role.name)) {
          acc.push(role);
        }
        return acc;
      }, []);

      setRoles(uniqueRoles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2>Your roles in {props.company}</h2>
        <ul>
          {roles.map((role, index) => (
            <li key={index}>{role.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default My_roles;
