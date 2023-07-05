import React, { useState, useEffect } from 'react';
import json from '../data/skills.json';
import axios from 'axios';
import qs from 'qs';

const Skill_input = () => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [knownSkills, setKnownSkills] = useState([]);
	const [expandedSkills, setExpandedSkills] = useState([]);

  const getAccessToken = async () => {
    const authData = {
      client_id: 'pz7sdkr9vczd2llx',
      client_secret: '9NEkJ8Su',
      grant_type: 'client_credentials',
      scope: 'emsi_open',
    };

    try {
      const response = await axios.post('https://auth.emsicloud.com/connect/token', qs.stringify(authData));
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

	const findKnownSkills = () => {
		const selectedEmployeeObj = json.find((employee) => employee.name === selectedEmployee);
	
		if (selectedEmployeeObj) {
			const skills = selectedEmployeeObj.skills || [];
			const knownSkillObjects = json.filter((item) => skills.includes(item.id));
			setKnownSkills(knownSkillObjects);
		} else {
			setKnownSkills([]);
		}
	};
	
	useEffect(() => {
		getRelatedSkills();
	}, [knownSkills]);

  const getRelatedSkills = async () => {
		try {
			const accessToken = await getAccessToken();
	
			if (accessToken && knownSkills.length > 0) {
				const response = await axios.post(
					'https://emsiservices.com/skills/versions/latest/related',
					{
						ids: knownSkills.map((skill) => skill.id),
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'Content-Type': 'application/json',
						},
					}
				);
	
				const relatedSkillsData = response.data.data || [];
				const relatedSkills = relatedSkillsData.map((skill) => skill.name);
				setRelatedSkills(relatedSkills);
			}
		} catch (error) {
			console.log(error);
		}
	};

  useEffect(() => {
    console.log(relatedSkills);
  }, [relatedSkills]);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

	const handleExpand = async (index) => {
		try {
			const accessToken = await getAccessToken();
	
			if (accessToken && knownSkills.length > 0) {
				const response = await axios.post(
					'https://emsiservices.com/skills/versions/latest/related',
					{
						ids: index.id,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'Content-Type': 'application/json',
						},
					}
				);
	
				const relatedSkillsData = response.data.data || [];
				const expand = relatedSkillsData.map((skill) => skill.name);
				setExpandedSkills(relatedSkills);
			}
		} catch (error) {
			console.log(error);
		}

	};

  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            value="Harald"
            checked={selectedEmployee === 'Harald'}
            onChange={handleEmployeeChange}
          />{' '}
          Harald
        </label>{' '}
        <br />
        <label>
          <input
            type="radio"
            value="Fredrik"
            checked={selectedEmployee === 'Fredrik'}
            onChange={handleEmployeeChange}
          />{' '}
          Fredrik
        </label>{' '}
        <br />
        <label>
          <input
            type="radio"
            value="Charlotte"
            checked={selectedEmployee === 'Charlotte'}
            onChange={handleEmployeeChange}
          />{' '}
          Charlotte
        </label>{' '}
        <br />
        <label>
          <input
            type="radio"
            value="Simon"
            checked={selectedEmployee === 'Simon'}
            onChange={handleEmployeeChange}
          />{' '}
          Simon
        </label>{' '}
        <br />
      </div>

      <button onClick={findKnownSkills}>Give me similar skills to what I know</button>

      <h2>You know:</h2>
      <ul>
        {knownSkills.map((skill, index) => (
          <li key={index}>{skill.name}</li>

        ))}
      </ul>

      <h2>You might want to learn:</h2>
			<ul>
    {relatedSkills.map((skill, index) => (
      <li key={index}>{skill}<button onClick={handleExpand(index)}>expand</button></li>
    ))}
  </ul>
    </>
  );
};

export default Skill_input;
