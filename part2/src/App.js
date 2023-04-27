import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Filter = (props) => {
  return (
    <div>
      <p>
        filter show whit <input value={props.filter} onChange={props.onChange} />
      </p>
    </div>
  );
}

const PersonForm = (props) => {
  const handleAddPerson = (event) => {
    event.preventDefault();
    const isDuplicateName = props.persons.some(person => person.name === props.newName)
    const isDuplicateNumber = props.persons.some(person => person.number === props.newNumber)
    if (isDuplicateName || isDuplicateNumber) {
      alert(`The name or number is already added to the phonebook`)
      return
    }
    const newPerson = { id: uuidv4(), name: props.newName, number: props.newNumber }
    props.setPersons(props.persons.concat(newPerson))
    props.setNewName('')
    props.setNewNumber('')
  }

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  );
}

const Persons = (props) => {
  const [filteredPersons, setFilteredPersons] = useState(props.persons)

  useEffect(() => {
    const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    setFilteredPersons(filtered)
  }, [props.persons, props.filter])

  return (
    <div>
      {filteredPersons.map(person => <p key={person.id}>{person.name}  {person.number}</p>)}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: uuidv4(), name: 'Arto Hellas', number: 111111111 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}


export default App