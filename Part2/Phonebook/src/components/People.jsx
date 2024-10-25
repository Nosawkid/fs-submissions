const People = ({ showNames, onClick }) => {
  return (
    <>
      {showNames.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onClick(person.id)}>Delete Contact</button>
        </p>
      ))}
    </>
  );
};

export default People;
