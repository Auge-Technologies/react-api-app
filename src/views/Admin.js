import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [uniqueSkills, setUniqueSkills] = useState([]);

  useEffect(() => {
    findEmployees();
  }, []);

  useEffect(() => {
    if (employees.length) {
      findAllSkills();
    }
  }, [employees]);

  const findEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/employees/1`);
      const employees = response.data;
      console.log(employees);
      setEmployees(employees);
    } catch (error) {
      console.error(error);
    }
  };

  const findAllSkills = async () => {
    let skills = [];
    for (let i = 1; i < employees.length; i++) {
      try {
        const response = await axios.get(
          `http://localhost:8080/employee/skills/${i}`
        );
        skills = [...skills, ...response.data];
      } catch (error) {
        console.error(error);
      }
    }
    setAllSkills(skills);
  };

  useEffect(() => {
    const computedUniqueSkills = allSkills.reduce((acc, skill) => {
      if (!acc.find((item) => item.name === skill.name)) {
        acc.push(skill);
      }
      return acc;
    }, []);
    setUniqueSkills(computedUniqueSkills);
  }, [allSkills]);

  const handleGiveAdmin = async (e) => {
    try {
      await axios.put(
        `http://localhost:8080/employee/setAdmin/${e.id}/${true}`
      );
    } catch (error) {
      console.error(error);
    }
    findEmployees();
  };

  return (
    <>
      <h1>Auge Tech</h1>
      <h2>All skills</h2>
      <ul>
        {uniqueSkills && (
          <>
            {uniqueSkills.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))}
          </>
        )}
      </ul>
      <h2>All employees</h2>
      <ul>
        {employees && (
          <>
            {employees.map((employee, index) => (
              <li key={index}>
                {employee.name}
                {!employee.admin && (
                  <button onClick={() => handleGiveAdmin(employees[index])}>
                    give admin
                  </button>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default Admin;
