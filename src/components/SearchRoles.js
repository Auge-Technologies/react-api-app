/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const SearchRoles = (props) => {
    const [searchedSkills, setSearchedSkills] = useState([]);
    const [skillObjects, setSkillObjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchRoles = async (searchQuery) => {
        // ...
    };

    const handleSearch = (searchQuery) => {
      /*  setIsLoading(true);
        searchRoles(searchQuery);*/
    };

    const handleChange = (event) => {
      /*  setSearchQuery(event.target.value);*/
    };

    const handleRoleGoal = async (skillObject) => {
        // ...
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
                ) : (
                    searchedSkills.map((skill, index) => (
                        <li key={index}>
                            {skill}
                            <button onClick={() => handleRoleGoal(skillObjects[index])}>
                                i know this
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
};

export default SearchRoles;
