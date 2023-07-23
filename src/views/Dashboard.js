import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_img from "../icons/manage_account.svg";
import SearchRoles from "../components/SearchRoles";
import useUserId from "../hooks/useUserId";
import My_roles from "../components/My_roles";
import APIUserService from "../endpoints/APIUserService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employeeGoals, setEmployeeGoals] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const { userId } = useUserId();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    fetchEmployeeGoals();
  }, [userId]);

  const fetchEmployeeGoals = async () => {
    APIUserService.getEmployeeGoals(userId)
      .then((response) => {
        const data = response.data;
        setEmployeeGoals(data);
      })
      .catch((error) => {
        console.log("Error fetching employee goals:", error);
      });
  };

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

  const handleGetMissingSkills = async (roleId) => {
    APIUserService.getEmployeeMissingSkills(userId, roleId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setMissingSkills(data);
      })
      .catch((error) => {
        console.log("Error fetching missing skills:", error);
      });
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
        <img
          src={profile_img}
          alt="profile"
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        />
        <h2>Your Goals</h2>
      </div>

      {employeeGoals.length > 0 ? (
        <ul>
          {employeeGoals.map((goal) => (
            <li key={goal.id}>
              {goal.name}
              <button
                onClick={() => {
                  handleToggleSkills(goal.id);
                  handleGetMissingSkills(goal.id);
                }}
              >
                {goal.showSkills ? "Hide Details" : "Show Details"}
              </button>
              {goal.showSkills && (
                <div>
                  <p>
                    Role Fulfilled: {calculateRolePercentageFulfilled(goal.id)}%
                  </p>
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
      <SearchRoles update={fetchEmployeeGoals} />
      <My_roles />
    </div>
  );
};

export default Dashboard;
