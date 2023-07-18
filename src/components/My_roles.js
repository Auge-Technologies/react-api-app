import { useEffect, useState } from "react";
import axios from "axios";

const My_roles = (props) => {
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(props.userId);
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
