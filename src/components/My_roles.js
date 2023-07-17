import { useEffect, useState } from "react";
import axios from "axios";

const My_roles = (props) => {
  const [user, setUser] = useState(props.user);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUser(props.user);
    const name = props.user.given_name;
    let userId;

    switch (name) {
      case "Harald":
        userId = 1;
        break;
      case "Fredrik":
        userId = 2;
        break;
      case "Charlotte":
        userId = 3;
        break;
      case "Simon":
        userId = 4;
        break;
      default:
        userId = 0; // Default value if the name doesn't match any case
    }
    setUserId(userId);
  }, [props.user]);

  useEffect(() => {
    console.log(user);
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
        <h2>My_roles</h2>
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
