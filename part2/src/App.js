import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import personService from './services/persons';
import './App.css';

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <p>
        filter show with <input value={filter} onChange={onChange} />
      </p>
    </div>
  );
};

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setErrorMessage }) => {
  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService.update(existingPerson.id, updatedPerson).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
          setNewName('');
          setNewNumber('');
        });
      } else {
        setErrorMessage(
          <div className="error">
            <p>`Some error happened...`</p>
          </div>
        )
      }
    } else {
      const newPerson = { id: uuidv4(), name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        const personToMessage = returnedPerson;
        setErrorMessage(
          <div className="noError">
            <p>`Person '${personToMessage.name}' was added to the phonebook`</p>
          </div>
        )
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter, onDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const personToMessage = persons.find((person) => person.id === id);
    if (window.confirm("Delete this person?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage(
          <div className="noError">
            <p>`Person '{personToMessage.name}' was already removed from server`</p>
          </div>
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;

//_____________________________________________________________________________________________

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Weather = ({ capital, apiKey }) => {
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     axios
//       .get(
//         `https://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
//       )
//       .then(response => {
//         setWeather(response.data.current);
//       });
//   }, [capital, apiKey]);

//   return (
//     <div>
//       <h2>Weather in {capital}</h2>
//       {weather && (
//         <>
//           <p>Temperature: {weather.temperature}°C</p>
//           <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
//           <p>
//             Wind: {weather.wind_speed} mph direction {weather.wind_dir}
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// const Country = ({ country, apiKey }) => {
//   return (
//     <div>
//       <h1>{country.name.common}</h1>
//       <p>Capital: {country.capital[0]}</p>
//       <p>Population: {country.population}</p>
//       <h2>Languages</h2>
//       <ul>
//         {Object.values(country.languages).map((language, index) => (
//           <li key={index}>{language}</li>
//         ))}
//       </ul>
//       <img src={country.flags.png} alt={country.name.common + ' flag'} height="100" />
//       <Weather capital={country.capital[0]} apiKey={apiKey} />
//     </div>
//   );
// };

// const CountryList = ({ countries, handleClick, apiKey }) => {
//   if (countries.length > 10) {
//     return <p>Too many matches, specify another filter</p>;
//   } else if (countries.length > 1) {
//     return (
//       <ul>
//         {countries.map(country => (
//           <li key={country.cca3}>
//             {country.name.common}{' '}
//             <button onClick={() => handleClick(country.name.common)}>show</button>
//           </li>
//         ))}
//       </ul>
//     );
//   } else if (countries.length === 1) {
//     return <Country country={countries[0]} apiKey={apiKey} />;
//   } else {
//     return <p>No matches, specify another filter</p>;
//   }
// };

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [filter, setFilter] = useState('');
//   const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

//   const handleFilterChange = event => {
//     setFilter(event.target.value);
//   };

//   const handleClick = name => {
//     setFilter(name);
//   };

//   useEffect(() => {
//     axios.get('https://restcountries.com/v3.1/all').then(response => {
//       setCountries(response.data);
//     });
//   }, []);

//   const filteredCountries = countries.filter(country =>
//     country.name.common.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div>
//       <form>
//         <div>
//           find countries <input value={filter} onChange={handleFilterChange} />
//         </div>
//       </form>
//       <CountryList countries={filteredCountries} handleClick={handleClick} apiKey={apiKey} />
//     </div>
//   );
// };

// export default App;