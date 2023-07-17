const Known_skills = (props) => {
  return (
    <>
      <h2>You know:</h2>
      <ul>
        {props.knownSkills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Known_skills;
