import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const Related_skills = (props) => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [isLoading, setIsLoading] = useState();

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

  const getRelatedSkills = async (skills, setSkills) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();

      if (accessToken && skills.length > 0) {
        const response = await axios.post(
          "https://emsiservices.com/skills/versions/latest/related",
          {
            ids: skills.map((skill) => skill.id),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const relatedSkillsData = response.data.data || [];
        setSkills(relatedSkillsData);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpand = (index) => {
    if (isExpanded.includes(index)) {
      setIsExpanded((prevState) => prevState.filter((item) => item !== index));
    } else {
      getRelatedSkills([relatedSkills[index]], setExpandedSkills);
      setIsExpanded((prevState) => [...prevState, index]);
    }
  };

  return (
    <>
      <button
        onClick={() => getRelatedSkills(props.knownSkills, setRelatedSkills)}
      >
        Give me similar skills to what I know
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : relatedSkills.length > 0 ? (
        <>
          <h2>You might want to learn:</h2>
          <ul>
            {relatedSkills.map((skill, index) => (
              <li key={index}>
                {skill.name}{" "}
                <button
                  onClick={() => {
                    handleExpand(index);
                  }}
                >
                  expand
                </button>
                {isExpanded.includes(index) && (
                  <ul>
                    {expandedSkills.map((skill, index) => (
                      <li key={index}>{skill.name}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default Related_skills;
