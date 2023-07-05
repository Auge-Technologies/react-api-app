import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import json from "../data/skills.json"

const Skill_search = () => {
  const [searchedSkills, setSearchedSkills] = useState([]);
	const [skillObjects, setSkillObjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAccessToken = async () => {
    const authData = {
      client_id: 'pz7sdkr9vczd2llx',
      client_secret: '9NEkJ8Su',
      grant_type: 'client_credentials',
      scope: 'emsi_open',
    };

    try {
      const response = await axios.post(
        'https://auth.emsicloud.com/connect/token',
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
			method: 'GET',
			url: 'https://emsiservices.com/skills/versions/latest/skills',
			params: {
				q: searchQuery,
				typeIds: 'ST1,ST2',
				fields: 'id,name,type,infoUrl',
				limit: '5',
			},
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	
		try {
			const response = await axios(options);
			const searchedSkillsData = response.data.data || [];
			console.log(searchedSkillsData);
			setSkillObjects(searchedSkillsData);
			const searchedSkills = searchedSkillsData.map((skill) => skill.name);
			setSearchedSkills(searchedSkills);
		} catch (error) {
			console.log(error);
			// Handle error when API call fails
		}


	};

	useEffect(() => {
    console.log(skillObjects);
  }, [skillObjects]);
	
	
  const handleSearch = (searchQuery) => {
    SearchSkills(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

	const handleKnowSkill = (selectedSkill) => {
		//legge til skill inder known skills i databse
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
  			<button onClick={() => handleKnowSkill(skillObjects[index])}>i know this</button>
			</li>
    ))}
  </ul>


    </>
  );
};

export default Skill_search;
