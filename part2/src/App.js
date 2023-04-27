// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const Filter = (props) => {
//   return (
//     <div>
//       <p>
//         filter show whit <input value={props.filter} onChange={props.onChange} />
//       </p>
//     </div>
//   );
// }

// const PersonForm = (props) => {
//   const handleAddPerson = (event) => {
//     event.preventDefault();
//     const isDuplicateName = props.persons.some(person => person.name === props.newName)
//     const isDuplicateNumber = props.persons.some(person => person.number === props.newNumber)
//     if (isDuplicateName || isDuplicateNumber) {
//       alert(`The name or number is already added to the phonebook`)
//       return
//     }
//     const newPerson = { id: uuidv4(), name: props.newName, number: props.newNumber }
//     props.setPersons(props.persons.concat(newPerson))
//     props.setNewName('')
//     props.setNewNumber('')
//   }

//   return (
//     <form onSubmit={handleAddPerson}>
//       <div>
//         name: <input value={props.newName} onChange={props.handleNameChange} />
//       </div>
//       <div>
//         number: <input value={props.newNumber} onChange={props.handleNumberChange} />
//       </div>
//       <div>
//         <button type="submit" >add</button>
//       </div>
//     </form>
//   );
// }

// const Persons = (props) => {
//   const [filteredPersons, setFilteredPersons] = useState(props.persons)

//   useEffect(() => {
//     const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
//     setFilteredPersons([...filtered])
//   }, [props.persons, props.filter])

//   return (
//     <div>
//       {filteredPersons.map(person => <p key={person.id}>{person.name}  {person.number}</p>)}
//     </div>
//   );
// }

// const App = () => {
//   const [persons, setPersons] = useState([])
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [filter, setFilter] = useState('')

//   useEffect(() => {
//     console.log('effect')
//     try {
//       axios
//         .get('http://localhost:3001/persons')
//         .then(response => {
//           console.log('promise fulfilled')
//           setPersons(response.data)
//         })
//     } catch (error) {
//       console.log(error)
//     }
//   }, [])
//   console.log('render', persons.length, 'persons')


//   const handleNameChange = (event) => {
//     setNewName(event.target.value)
//   }
//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value)
//   }
//   const handleFilterChange = (event) => {
//     setFilter(event.target.value)
//   }

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Filter value={filter} onChange={handleFilterChange} />
//       <h2>Add a new</h2>
//       <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
//       <h2>Numbers</h2>
//       <Persons persons={persons} filter={filter} />
//     </div>
//   )
// }


// export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowCountry = name => {
    setSearchTerm(name);
  };

  let display;

  if (filteredCountries.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    display = filteredCountries.map(country => (
      <div key={country.alpha3Code}>
        <p>{country.name}</p>
        <button onClick={() => handleShowCountry(country.name)}>show</button>
      </div>
    ));
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    display = (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} style={{ maxWidth: '200px' }} />
      </div>
    );
  } else {
    display = <p>No countries found</p>;
  }

  return (
    <div>
      <label htmlFor="search-input">Find countries</label>
      <input id="search-input" value={searchTerm} onChange={handleSearch} />
      <div>{display}</div>
    </div>
  );
};

export default App;
