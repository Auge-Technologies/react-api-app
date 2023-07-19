import axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

class APIUserService {
    getEmployeesInCompany(companyId) {
        return axios.get(BACKEND_URL + "/employees/" + companyId);
    }

    getEmployeeSkills(employeeId) {
        return axios.get(BACKEND_URL + "/employee/skills/" + employeeId);
    }

    setEmployeeAdmin(employeeId, isAdmin) {
        return axios.put(BACKEND_URL + "/employee/setAdmin/" + employeeId + "/" + isAdmin);
    }

    getEmployeeCompany(employeeId) {
        return axios.get(BACKEND_URL + "/employee/getCompany/" + employeeId);
    }
}
export default new APIUserService();