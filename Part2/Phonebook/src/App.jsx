import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";

const App = () => {
  const [people, setPeople] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [nameTobeSearched, setNameTobeSearched] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const exists = people.findIndex((person) => person.name === newName);
    if (exists !== -1) {
      return alert(`${newName} is already added to the phonebook`);
    }
    const objToAdded = {
      name: newName,
      number,
      id: people.length + 1,
    };
    setPeople(people.concat(objToAdded));
  };

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberInput = (e) => {
    setNumber(e.target.value);
  };

  const handleSearchInput = (e) => {
    setNameTobeSearched(e.target.value);
  };

  const showNames = people.filter((person) =>
    person.name.toLowerCase().includes(nameTobeSearched.toLowerCase())
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>

        <Filter
          nameTobeSearched={nameTobeSearched}
          onChange={handleSearchInput}
        />

        <h2>Add new</h2>
        <PersonForm
          onSubmit={handleFormSubmit}
          onNameChange={handleNameInput}
          onNumberChange={handleNumberInput}
          newName={newName}
          number={number}
        />
        <h2>Numbers</h2>
        <People showNames={showNames} />
      </div>
    </>
  );
};

export default App;
