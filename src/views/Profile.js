import React, { useEffect, useState } from "react";
import Skill_input from "../components/Skill_input";
import Skill_search from "../components/Skill_search";
import My_roles from "../components/My_roles";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";

const Profile = () => {
  const { logout } = useAuth0();
  const { isAuthenticated, user } = useAuth0(); // Use the useAuth0 hook to access user information

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>{user.given_name}</h1>
        </div>
      )}
      <h2>About Page</h2>
      <Skill_input name={user.given_name || "ano"} />
      <Skill_search />
      <My_roles />
      <button onClick={handleLogoutClick}>logout</button>
    </div>
  );
};

export default Profile;
