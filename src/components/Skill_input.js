import React, { useState, useEffect } from "react";
import json from "../data/skills.json";
import axios from "axios";
import qs from "qs";

const Skill_input = () => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [knownSkills, setKnownSkills] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState();
  const [isExpanded, setIsExpanded] = useState([]);

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

  const findKnownSkills = () => {
    const selectedEmployeeObj = json.find(
      (employee) => employee.name === selectedEmployee
    );

    if (selectedEmployeeObj) {
      const skills = selectedEmployeeObj.skills || [];
      const knownSkillObjects = json.filter((item) => skills.includes(item.id));
      setKnownSkills(knownSkillObjects);
    } else {
      setKnownSkills([]);
    }
  };

  // const findKnownSkills = async () => {
  //   try {
  //     const response = await axios.get("/employee/skills/1"); // Replace with your actual Spring Boot endpoint
  //     const employees = response.data;

  //     const selectedEmployeeObj = employees.find(
  //       (employee) => employee.name === selectedEmployee
  //     );

  //     if (selectedEmployeeObj) {
  //       const skills = selectedEmployeeObj.skills || [];
  //       const knownSkillObjects = skills.map((skillId) =>
  //         employees.find((employee) => employee.id === skillId)
  //       );
  //       setKnownSkills(knownSkillObjects);
  //     } else {
  //       setKnownSkills([]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        const relatedSkills = relatedSkillsData.map((skill) => skill.name);
        setSkills(relatedSkillsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(relatedSkills);
  }, [relatedSkills]);

  useEffect(() => {
    console.log(expandedSkills);
  }, [expandedSkills]);

  useEffect(() => {
    findKnownSkills();
  }, [selectedEmployee]);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
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
      <div>
        <label>
          <input
            type="radio"
            value="Harald"
            checked={selectedEmployee === "Harald"}
            onChange={handleEmployeeChange}
          />{" "}
          Harald
        </label>{" "}
        <br />
        <label>
          <input
            type="radio"
            value="Fredrik"
            checked={selectedEmployee === "Fredrik"}
            onChange={handleEmployeeChange}
          />{" "}
          Fredrik
        </label>{" "}
        <br />
        <label>
          <input
            type="radio"
            value="Charlotte"
            checked={selectedEmployee === "Charlotte"}
            onChange={handleEmployeeChange}
          />{" "}
          Charlotte
        </label>{" "}
        <br />
        <label>
          <input
            type="radio"
            value="Simon"
            checked={selectedEmployee === "Simon"}
            onChange={handleEmployeeChange}
          />{" "}
          Simon
        </label>{" "}
        <br />
      </div>

      <button onClick={() => getRelatedSkills(knownSkills, setRelatedSkills)}>
        Give me similar skills to what I know
      </button>

      <h2>You know:</h2>
      <ul>
        {knownSkills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>

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
