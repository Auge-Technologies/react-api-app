import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const Skill_input = () => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [knownSkills, setKnownSkills] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [employees, setEmployees] = useState([]);

  const FindEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/employees/1");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const findKnownSkills = async (employeeId) => {
    try {
      const response = await axios.get(
          `http://localhost:8080/employee/skills/${employeeId}`
      );
      const skills = response.data;
      setKnownSkills(skills);
    } catch (error) {
      console.error(error);
    }
  };

  const getRelatedSkills = async (employeeId, skills, setSkills) => {
    console.log(skills);
    try {
      const response = await axios.get(
          `http://localhost:8080/employee/related/skills/${employeeId}`
      );
      const relatedSkillsData = response.data.data || [];
      setSkills(relatedSkillsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmployeeChange = (e, employeeId) => {
    setSelectedEmployee(employeeId);
    setRelatedSkills([]);
    findKnownSkills(employeeId);
  };

  const handleExpand = (index) => {
    // Your existing code
  };

  return (
      <div>
        <button onClick={FindEmployees}>Get Employees</button>
        <br />
        {employees.map((employee) => (
            <div key={employee.id}>
              <label>
                <input
                    type="radio"
                    value={employee.id}
                    checked={selectedEmployee === employee.id}
                    onChange={(e) => handleEmployeeChange(e, employee.id)}
                />
                {employee.name}
              </label>
              <br />
            </div>
        ))}

        <button onClick={() => getRelatedSkills(knownSkills, setRelatedSkills)}>
          Give me similar skills to what I know
        </button>

        {selectedEmployee && (
            <div>
              <h2>You know:</h2>
              <ul>
                {knownSkills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
        )}

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
      </div>
  );
};

export default Skill_input;
