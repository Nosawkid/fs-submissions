import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import peopleServices from "./services/people";
import Notifications from "./components/Notifications";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [nameTobeSearched, setNameTobeSearched] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const deletePerson = (id) => {
    const person = people.find((p) => p.id === id);
    const deleteContact = window.confirm(
      `Do you want to delete ${person.name}`
    );
    if (!deleteContact) {
      return;
    }
    peopleServices.deletePerson(id).then((res) => {
      setPeople(people.filter((person) => person.id !== id));
      showError(`${res.name} was deleted`);
    });
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const objToAdded = {
      name: newName,
      number,
    };
    setNewName("");
    setNumber("");
    const person = people.find((p) => p.name === newName);
    if (person) {
      const changeNumber = window.confirm(
        `${person.name} already exists, do you want to replace the number with new number ?`
      );

      if (!changeNumber) {
        return;
      }

      return peopleServices
        .updatePerson(person.id, objToAdded)
        .then((res) => {
          setPeople(people.map((p) => (p.id === person.id ? res : p)));
          showError(`${res.name} has been updated`);
        })
        .catch((err) => {
          showError(
            `Information of ${person.name} has been removed from the server`
          );
        });
    }

    peopleServices.addPerson(objToAdded).then((res) => {
      setPeople(people.concat(res));
      return showError(`${res.name} has been added to Phonebook`);
    });
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

  useEffect(() => {
    peopleServices.getAllPeople().then((res) => {
      setPeople(res);
    });
  }, []);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notifications message={errorMessage} />
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
        <People showNames={showNames} onClick={deletePerson} />
      </div>
    </>
  );
};

export default App;
