import React, { useEffect, useState } from "react";
import My_roles from "../components/My_roles";
import Known_skills from "../components/Known_skills";
import axios from "axios";
import Related_skills from "../components/Related_skills";
import Search_skills from "../components/Search_skills";
import { useNavigate } from "react-router-dom";
import APIUserService from "../endpoints/APIUserService";
import useAuth from "../hooks/useAuth";
import useUserId from "../hooks/useUserId";

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [knownSkills, setKnownSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useUserId();
  const [company, setCompany] = useState("Auge");
  const [isAdmin, setIsAdmin] = useState(true);

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
      .catch((error) => {
        console.error(error);
      });
  };

  const findCompany = async () => {
    APIUserService.getEmployeeCompany(userId)
      .then((response) => {
        setCompany(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleAdmin = () => {
    navigate(`/admin/${company}`);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>{user.name}</h1>
          {isAdmin && (
            <>
              (administator) <button onClick={handleAdmin}>admin page</button>
            </>
          )}
        </div>
      )}
      <button onClick={handleDashboard}>Dashboard</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Known_skills knownSkills={knownSkills} />
      )}
      <Related_skills knownSkills={knownSkills} />
      <Search_skills userId={userId} updateSkills={findKnownSkills} />
      <button onClick={handleLogoutClick}>logout</button>
    </div>
  );
};

export default Profile;
