import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [persons, setPersons] = useState([
    { id: uuidv4(), name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleAddPerson = (event) => {
    event.preventDefault();
    const isDuplicateName = persons.some(person => person.name === newName)
    if (isDuplicateName) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = { id: uuidv4(), name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons => <p key={persons.id}>{persons.name}</p>)}
    </div>
  )
}

export default App