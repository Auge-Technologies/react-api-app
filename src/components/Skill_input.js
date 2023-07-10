import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const Skill_input = (props) => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [knownSkills, setKnownSkills] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [employee, setEmployee] = useState([]);

  const getAccessToken = async () => {
    const authData = {
      client_id: "stq2qi97wjfeyjye",
      client_secret: "iKDBB7ZI",
      grant_type: "client_credentials",
      scope: "emsi_open",
    };

    try {
      const response = await axios.post(
        "https://auth.emsicloud.com/connect/token",
        qs.stringify(authData)
      );
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const FindEmployees = async () => {
    try {
      console.log(props.name);
      const response = await axios.get(`http://localhost:8080/employees/1`);
      const employee = response.data.filter(
        (employee) => employee.name === props.name
      );
      setEmployee(employee);
    } catch (error) {
      console.error(error);
    }
  };

  const findKnownSkills = async () => {
    try {
      const id = employee.map((a) => a.id);
      console.log(employee);
      console.log(id);
      const response = await axios.get(
        `http://localhost:8080/employee/skills/${id}`
      ); // Replace with your actual Spring Boot endpoint

      const skills = response.data;

      const uniqueSkills = skills.reduce((acc, skill) => {
        if (!acc.find((item) => item.name === skill.name)) {
          acc.push(skill);
        }
        return acc;
      }, []);

      setKnownSkills(uniqueSkills);
    } catch (error) {
      console.error(error);
    }
  };

  const getRelatedSkills = async (skills, setSkills) => {
    console.log(skills);
    try {
      const accessToken = await getAccessToken();

      if (accessToken && skills.length > 0) {
        const response = await axios.post(
          "https://emsiservices.com/skills/versions/latest/related",
          {
            ids: skills.map((skill) => skill.id),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const relatedSkillsData = response.data.data || [];
        setSkills(relatedSkillsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findKnownSkills();
  }, [employee]);

  useEffect(() => {
    FindEmployees();
  }, []);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setRelatedSkills([]);
  };

  const handleExpand = (index) => {
    if (isExpanded.includes(index)) {
      setIsExpanded((prevState) => prevState.filter((item) => item !== index));
    } else {
      getRelatedSkills([relatedSkills[index]], setExpandedSkills);
      setIsExpanded((prevState) => [...prevState, index]);
    }
  };

  return (
    <>
      <h2>You know:</h2>
      <ul>
        {knownSkills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>

      <button onClick={() => getRelatedSkills(knownSkills, setRelatedSkills)}>
        Give me similar skills to what I know
      </button>

      <h2>You might want to learn:</h2>
      <ul>
        {relatedSkills.map((skill, index) => (
          <li key={index}>
            {skill.name}{" "}
            <button
              onClick={() => {
                handleExpand(index);
              }}
            >
              expand
            </button>
            {isExpanded.includes(index) && (
              <ul>
                {expandedSkills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Skill_input;
