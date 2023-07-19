import React, { useEffect, useState } from "react";
import Skill_input from "../components/Related_skills";
import Skill_search from "../components/Search_skills";
import My_roles from "../components/My_roles";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import Known_skills from "../components/Known_skills";
import axios from "axios";
import Related_skills from "../components/Related_skills";
import Search_skills from "../components/Search_skills";
import { useNavigate } from "react-router-dom";
import APIUserService from "../endpoints/APIUserService";

const Profile = () => {
  const { logout } = useAuth0();
  const { isAuthenticated, user } = useAuth0(); // Use the useAuth0 hook to access user information
  const navigate = useNavigate();
  const [knownSkills, setKnownSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [company, setCompany] = useState("Auge");
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    let parts = user.sub.split("|");
    let numberString = parts[1];
    setUserId(numberString);
    console.log(numberString)
  }, [user]);

  useEffect(() => {
    findKnownSkills();
    findCompany();
  }, [userId]);

  const findKnownSkills = async () => {
    APIUserService.getEmployeeSkills(userId)
        .then((response) => {
          const skills = response.data;
          const uniqueSkills = skills.reduce((acc, skill) => {
            if (!acc.find((item) => item.name === skill.name)) {
              acc.push(skill);
            }
            return acc;
          }, []);
          setKnownSkills(uniqueSkills);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });
  };


  const findCompany = async () => {
    APIUserService.getEmployeeCompany(userId).then(response => {
      setCompany(response.data.name);
    }).catch(error => {
      console.log(error);
    })
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>{user.nickname}</h1>
          {isAdmin && (
            <>
              (administator) <button onClick={handleAdmin}>admin page</button>
            </>
          )}
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Known_skills knownSkills={knownSkills} />
      )}
      <Related_skills knownSkills={knownSkills} />
      <Search_skills userId={userId} updateSkills={findKnownSkills} />
      <My_roles userId={userId} company={company} />
      <button onClick={handleLogoutClick}>logout</button>
    </div>
  );
};

export default Profile;
