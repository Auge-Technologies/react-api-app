import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import APIUserService from "../endpoints/APIUserService";

const Search_skills = (props) => {
  const [searchedSkills, setSearchedSkills] = useState([]);
  const [skillObjects, setSkillObjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SearchSkills = async (searchQuery) => {

    APIUserService.getSKillsBySearch(searchQuery, 10).then(response => {
      const searchedSkillsData = response.data;
      setSkillObjects(searchedSkillsData);
      const searchedSkills = searchedSkillsData.map((skill) => skill.name);
      setSearchedSkills(searchedSkills);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  };

  const handleSearch = (searchQuery) => {
    setIsLoading(true);
    SearchSkills(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKnowSkill = async (skillObject) => {
    const employeeId = props.userId;
    const { id, name } = skillObject;
    APIUserService.addSkillToEmployee(employeeId, id, name).then(() => {
      props.updateSkills();
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <>
      <h2>Search for skill</h2>
      <input
        type="text"
        placeholder="Search for skill"
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
              <button onClick={() => handleKnowSkill(skillObjects[index])}>
                i know this
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default Search_skills;
