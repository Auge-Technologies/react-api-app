import { useEffect, useState } from "react";

const Known_skills = (props) => {
  const [knownSkills, setKnownSkills] = useState(props.knownSkills);

  useEffect(() => {
    setKnownSkills(props.knownSkills);
    console.log(knownSkills);
  }, [props.knownSkills]);

  return (
    <>
      <h2>You know:</h2>
      <ul>
        {knownSkills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Known_skills;
