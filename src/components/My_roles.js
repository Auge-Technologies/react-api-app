import { useEffect, useState } from "react";
import useUserId from "../hooks/useUserId";
import APIUserService from "../endpoints/APIUserService";

const My_roles = (props) => {
  const [roles, setRoles] = useState([]);
  const [company, setCompany] = useState("");
  const { userId } = useUserId();

  useEffect(() => {
    fetchEmployeeRoles(userId);
    fetchCompany(userId);
  }, [userId]);

  const fetchEmployeeRoles = async (userId) => {
    APIUserService.getQualifiedRoles(userId)
      .then((response) => {
        const rolesData = response.data;
        setRoles(rolesData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCompany = async (userId) => {
    APIUserService.getEmployeeCompany(userId)
      .then((response) => {
        const data = response.data;
        setCompany(data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <h2>Your roles in {company}</h2>
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
