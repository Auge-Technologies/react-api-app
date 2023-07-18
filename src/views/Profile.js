import React, { useEffect, useState } from "react";
import Skill_input from "../components/Related_skills";
import Skill_search from "../components/Search_skills";
import My_roles from "../components/My_roles";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import Known_skills from "../components/Known_skills";
import axios from "axios";
import Related_skills from "../components/Related_skills";
import Search_skills from "../components/Search_skills";

const Profile = () => {
  const { logout } = useAuth0();
  const { isAuthenticated, user } = useAuth0();

  const [knownSkills, setKnownSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const userId = user.sub;
    console.log(userId)
    console.log(user)
    setUserId(userId);
  }, [user]);

  useEffect(() => {
    findKnownSkills();
  }, [userId]);

  const findKnownSkills = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/employee/skills/${userId}`
      );
      const skills = response.data;
      const uniqueSkills = skills.reduce((acc, skill) => {
        if (!acc.find((item) => item.name === skill.name)) {
          acc.push(skill);
        }
        return acc;
      }, []);
      setKnownSkills(uniqueSkills);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Known_skills knownSkills={knownSkills} />
      )}
      <Related_skills knownSkills={knownSkills} />
      <Search_skills user={user} />
      <My_roles userId={userId} />
      <button onClick={handleLogoutClick}>logout</button>
    </div>
  );
};

export default Profile;
