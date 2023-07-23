import { useState } from "react";
import axios from "axios";
import qs from "qs";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SearchRoles = (props) => {
  const [searchedRole, setSearchedRole] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const [buttonClicked, setButtonClicked] = useState(false);

  const searchRoles = async (searchQuery) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/roles/search/${searchQuery}`
      );
      if (response.data.length === 0) {
        setSearchedRole([]); // Reset the searchedRole state if there are no results
      } else {
        setSearchedRole(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching for roles:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setIsLoading(true);
    setButtonClicked(true); // Set the buttonClicked state to true when the button is clicked
    searchRoles(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleGoal = async (role) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:8080/employee/add/goal",
        qs.stringify({
          employeeId: userId,
          roleGoalId: role.id,
          roleGoalName: role.name,
        })
      );
      setIsLoading(false);
      props.update();
    } catch (error) {
      console.error("Error adding goal:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2>Search for role</h2>
      <input
        type="text"
        placeholder="Search for role"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={() => handleSearch(searchQuery)}>🔎</button>
      <ul>
        {isLoading ? (
          <p>Loading...</p>
        ) : buttonClicked && searchedRole.length === 0 ? ( // Display "No such role" if the button is clicked and there are no results
          <p>No such role...</p>
        ) : (
          searchedRole.map((role, index) => (
            <li key={index}>
              {role.name}
              <button onClick={() => handleRoleGoal(role)}>add as goal</button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};
export default SearchRoles;
