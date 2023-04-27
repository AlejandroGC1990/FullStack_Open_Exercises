import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [persons, setPersons] = useState([
    { id: uuidv4(), name: 'Arto Hellas', number: 111111111 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault();
    const isDuplicateName = persons.some(person => person.name === newName)
    const isDuplicateNumber = persons.some(person => person.number === newNumber)
    if (isDuplicateName || isDuplicateNumber) {
      alert(`The name or number is already added to the phonebook`)
      return
    } 
    const newPerson = { id: uuidv4(), name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons => <p key={persons.id}>{persons.name}  {persons.number}</p>)}
    </div>
  )
}

export default App