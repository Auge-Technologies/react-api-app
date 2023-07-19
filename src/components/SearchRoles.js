import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useAuth0 } from "@auth0/auth0-react";

const SearchRoles = (props) => {
    const [searchedRole, setSearchedRole] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, user } = useAuth0();
    const [userId, setUserId] = useState();

    useEffect(() => {
        let parts = user.sub.split("|");
        let numberString = parts[1];
        setUserId(numberString);
    }, [user]);

    const searchRoles = async (searchQuery) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8080/roles/search/${searchQuery}`);
            console.log(response.data);
            setSearchedRole(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error searching for roles:", error);
            setIsLoading(false);
        }
    };

    const handleSearch = (searchQuery) => {
        setIsLoading(true);
        searchRoles(searchQuery);
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRoleGoal = async (role) => {
        console.log("role");
        console.log(role);
        try {
            setIsLoading(true);
            const response = await axios.put("http://localhost:8080/employee/add/goal", qs.stringify({
                employeeId: userId,
                goalId: role.id,
                roleName: role.name
            }));
            console.log("Goal added successfully");
            setIsLoading(false);
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
            {searchedRole.length === 0 && (
                <p>No such role...</p>
            )}
            <ul>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    searchedRole.map((role, index) => (
                        <li key={index}>
                            {role.name}
                            <button onClick={() => handleRoleGoal(role)}>
                                add as goal
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};

export default SearchRoles;
