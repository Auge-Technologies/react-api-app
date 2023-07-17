import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const Search_skills = (props) => {
  const [searchedSkills, setSearchedSkills] = useState([]);
  const [skillObjects, setSkillObjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAccessToken = async () => {
    const authData = {
      client_id: "uj7mks4c41f42frd",
      client_secret: "eBcoBJoG",
      grant_type: "client_credentials",
      scope: "emsi_open",
    };

    try {
      const response = await axios.post(
        "https://auth.emsicloud.com/connect/token",
        qs.stringify(authData)
      );
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const SearchSkills = async (searchQuery) => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return;
    }

    const options = {
      method: "GET",
      url: "https://emsiservices.com/skills/versions/latest/skills",
      params: {
        q: searchQuery,
        typeIds: "ST1,ST2",
        fields: "id,name,type,infoUrl",
        limit: "10",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios(options);
      const searchedSkillsData = response.data.data || [];
      setSkillObjects(searchedSkillsData);
      const searchedSkills = searchedSkillsData.map((skill) => skill.name);
      setSearchedSkills(searchedSkills);
    } catch (error) {
      console.log(error);
      // Handle error when API call fails
    }
  };

  const handleSearch = (searchQuery) => {
    SearchSkills(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKnowSkill = async (skillObject) => {
    //   try {
    //     const employee = props.user;
    //     console.log(employee);
    //     const id = 1;
    //     console.log(id);
    //     // Create an object representing the known skill
    //     const knownSkill = {
    //       id: skillObject.id,
    //       name: skillObject.name,
    //       // Add more properties as needed
    //     };
    //     console.log(knownSkill);
    //     // Make a POST request to add the known skill to the user
    //     const response = await axios.post(
    //       `http://localhost:8080/employee/addSkill/${id}`,
    //       knownSkill
    //     ); // Replace with your actual Spring Boot endpoint
    //     console.log(response.data); // The response from the server after adding the known skill
    //     // Call the findKnownSkills function to update the known skills list
    //   } catch (error) {
    //     console.error(error);
    //   }
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
        {searchedSkills.map((skill, index) => (
          <li key={index}>
            {skill}
            <button onClick={() => handleKnowSkill(skillObjects[index])}>
              i know this
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Search_skills;
