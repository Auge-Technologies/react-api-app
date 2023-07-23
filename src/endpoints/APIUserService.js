import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

class APIUserService {
  getEmployeesInCompany(companyId) {
    return axios.get(BACKEND_URL + "/employees/" + companyId);
  }

  getEmployeeSkills(employeeId) {
    return axios.get(BACKEND_URL + "/employee/skills/" + employeeId);
  }

  getEmployeeCompany(employeeId) {
    return axios.get(BACKEND_URL + "/employee/getCompany/" + employeeId);
  }

  getQualifiedRoles(employeeId) {
    return axios.get(BACKEND_URL + "/employee/qualifiedRoles/" + employeeId);
  }

  getEmployeeGoals(employeeId) {
    return axios.get(BACKEND_URL + "/employee/goals/" + employeeId);
  }

  getEmployee(employeeId) {
    return axios.get(BACKEND_URL + "/employee/id/" + employeeId);
  }

  getEmployeeMissingSkills(employeeId, roleId) {
    return axios.get(
      BACKEND_URL +
        "/employee/skillsMissingFromRole/" +
        employeeId +
        "/" +
        roleId
    );
  }

  getRelatedSkillsByEmployee(employeeId) {
    return axios.get(BACKEND_URL + "/employee/related/skills/" + employeeId);
  }

  getRelatedSkills(skillIds) {
    return axios.get(BACKEND_URL + "/skill/related/" + skillIds);
  }

  getSKillsBySearch(searchString, limit) {
    return axios.get(
      BACKEND_URL + "/skill/search/" + searchString + "/" + limit
    );
  }

  setEmployeeAdmin(employeeId, isAdmin) {
    return axios.put(
      BACKEND_URL + "/employee/setAdmin/" + employeeId + "/" + isAdmin
    );
  }

  setUserInDatabase(employeeId) {
    return axios.put(BACKEND_URL + "/add/employee/" + employeeId);
  }

  addSkillToEmployee(employeeId, skillId, skillName) {
    return axios.put(
      BACKEND_URL +
        "/employee/add/skill/" +
        employeeId +
        "/" +
        skillId +
        "/" +
        skillName
    );
  }
}
export default new APIUserService();
