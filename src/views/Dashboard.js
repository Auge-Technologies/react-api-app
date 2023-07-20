
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import profile_img from '../icons/manage_account.svg';
import axios from "axios";
import SearchRoles from "../components/SearchRoles";
import useAuth from "../hooks/useAuth";


const Dashboard = () => {
  const navigate = useNavigate();
  const [employeeGoals, setEmployeeGoals] = useState([]);
  const { isAuthenticated, user, logout } = useAuth();
  const [userId, setUserId] = useState();
  const [missingSkills, setMissingSkills] = useState([]);

  const handleLogoutClick = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      let parts = user.sub.split("|");
      let numberString = parts[1];
      setUserId(numberString);
    }
  }, [user]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchEmployeeGoals = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/employee/goals/${userId}`
        );
        const data = await response.json();
        setEmployeeGoals(data);
      } catch (error) {
        console.log("Error fetching employee goals:", error);
      }
    };

    fetchEmployeeGoals();
  }, [userId]);

  const handleToggleSkills = async (goalId) => {
    setEmployeeGoals((prevGoals) => {
      return prevGoals.map((prevGoal) => {
        if (prevGoal.id === goalId) {
          return {
            ...prevGoal,
            showSkills: !prevGoal.showSkills,
          };
        }
        return prevGoal;
      });
    });
  };

  const handleGetMissingSkills = async (employeeId, roleId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/employee/skillsMissingFromRole/${employeeId}/${roleId}`
      );
      const data = await response.json();
      setMissingSkills(data);
    } catch (error) {
      console.log("Error fetching missing skills:", error);
    }
  };

  const calculateRolePercentageFulfilled = (goalId) => {
    const goal = employeeGoals.find((goal) => goal.id === goalId);
    const relevantSkillsCount = goal.relevantSkills.length;
    const missingSkillsCount = missingSkills.length;
    const fulfilledSkillsCount = relevantSkillsCount - missingSkillsCount;
    const percentageFulfilled =
      (fulfilledSkillsCount / relevantSkillsCount) * 100;
    return Math.round(percentageFulfilled);
  };



    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <img src={profile_img} alt="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
                    <h2>Your Goals</h2>
                </div>

            {employeeGoals.length > 0 ? (
                <ul>
                    {employeeGoals.map((goal) => (
                        <li key={goal.id}>
                            {goal.name}
                            <button onClick={() => {
                                handleToggleSkills(goal.id);
                                handleGetMissingSkills(userId, goal.id);
                            }}>
                                {goal.showSkills ? 'Hide Details' : 'Show Details'}
                            </button>
                            {goal.showSkills && (
                                <div>
                                    <p>Role Fulfilled: {calculateRolePercentageFulfilled(goal.id)}%</p>
                                    <p>Skills Required:</p>
                                    <ul>
                                        {goal.relevantSkills.map((skill, index) => (
                                            <li key={index}>{skill.name}</li>
                                        ))}
                                    </ul>
                                    {missingSkills.length > 0 && (
                                        <div>
                                            <p>Skills Not Obtained:</p>
                                            <ul>
                                                {missingSkills.map((missingSkill, index) => (
                                                    <li key={index}>{missingSkill.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No employee goals found.</p>
            )}
            <SearchRoles/>
        </div>
    );
};

export default Dashboard;
