import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import APIUserService from "../endpoints/APIUserService";

const Related_skills = (props) => {
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [expandedSkills, setExpandedSkills] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const getRelatedSkills = async (skills, setSkills) => {
    setIsLoading(true);
    if (skills.length > 0) {
      APIUserService.getRelatedSkills(skills.map((skill) => skill.id)).then(response => {
        const relatedSkillsData = response.data;
        setSkills(relatedSkillsData);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
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
