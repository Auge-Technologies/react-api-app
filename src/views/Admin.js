import { useEffect, useState } from "react";
import axios from "axios";
import useFetchApi from "../hooks/useFetchApi";

const Admin = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [uniqueSkills, setUniqueSkills] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: employeesData, error: employeesError } = useFetchApi(
    `http://localhost:8080/employees/1`,
    refreshKey
  );

  useEffect(() => {
    if (employeesData) {
      setEmployees(employeesData);
      console.log(employeesData);
    }
  }, [employeesData]);

  useEffect(() => {
    extractCompanyName();
  }, []);

  useEffect(() => {
    if (employees.length) {
      findAllSkills();
    }
  }, [employees]);

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

  const extractCompanyName = () => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const companyName = segments[segments.length - 1].replace("%20", " ");
    setCompanyName(companyName);
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
      setRefreshKey((refreshKey) => refreshKey + 1); // Trigger refresh of useFetchApi hook
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{companyName}</h1>
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
