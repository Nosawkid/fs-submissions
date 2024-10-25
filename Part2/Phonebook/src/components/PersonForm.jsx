const PersonForm = ({
  onSubmit,
  onNameChange,
  onNumberChange,
  newName,
  number,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          Name:{" "}
          <input type="text" onChange={onNameChange} value={newName} required />
        </div>
        <div>
          Number:{" "}
          <input
            type="text"
            onChange={onNumberChange}
            value={number}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
