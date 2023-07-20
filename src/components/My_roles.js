import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useUserId from "../hooks/useUserId";
import useFetchApi from "../hooks/useFetchApi";

const My_roles = (props) => {
  const { userId } = useUserId();
  const { data: roles } = useFetchApi(
    `http://localhost:8080/employee/roles/${userId}`
  );

  return (
    <>
      <div>
        <h2>Your roles in {props.company}</h2>
        <ul>
          {roles &&
            roles.map((role, index) => <li key={index}>{role.name}</li>)}
        </ul>
      </div>
    </>
  );
};

export default My_roles;
