const People = ({ showNames }) => {
  return (
    <>
      {showNames.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default People;
