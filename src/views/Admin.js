import { useEffect, useState } from "react";
import APIUserService from "../endpoints/APIUserService";
const Admin = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [uniqueSkills, setUniqueSkills] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    findEmployees();
    extractCompanyName();
  }, []);

  useEffect(() => {
    if (employees?.length) {
      findAllSkills();
    }
  }, [employees]);

  const findEmployees = async () => {
    APIUserService.getEmployeesInCompany(1).then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.error(error);
    })
  };

  const findAllSkills = async () => {
    try {
      const allSkillsResponse = [];

      for (const employee of employees) {
        const response = await APIUserService.getEmployeeSkills(employee.id);
        allSkillsResponse.push(...response.data);
      }

      const uniqueSkills = allSkillsResponse.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      setAllSkills(uniqueSkills);
    } catch (error) {
      console.error(error);
    }
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
      await APIUserService.setEmployeeAdmin(e.id, true);
    } catch (error) {
      console.error(error);
    }
    findEmployees();
  };

  return (
    <>
      <h1>{companyName}</h1>
      <h2>All skills</h2>
      <ul>
        {allSkills && (
          <>
            {allSkills.map((skill, index) => (
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
