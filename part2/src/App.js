import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    axios
      .post('http://localhost:3001/persons', newPerson) //El objeto se envía al servidor mediante el método axios post. 
      .then(response => {                               //El controlador de eventos registrado registra la respuesta que se envía desde el servidor a la consola.
        props.setPersons(props.persons.concat(newPerson)) 
        props.setNewName('')
        props.setNewNumber('')                            
        console.log({ response })   
        /*La nueva persona devuelta por el servidor backend se agrega a la lista de notas en el estado de nuestra aplicación en la forma habitual de usar 
        la función setPersons y luego restablecer el formulario de creación de notas. Un detalle importante para recordar es que el método concat no cambia
        el estado original del componente, sino que crea una nueva copia de la lista.*/
      });
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
    setFilteredPersons([...filtered])
  }, [props.persons, props.filter])

  return (
    <div>
      {filteredPersons.map(person => <p key={person.id}>{person.name}  {person.number}</p>)}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  //TRAE LOS DATOS DEL SERVIDOR
  useEffect(() => {
    console.log('effect')
    try {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log('render', persons.length, 'persons')


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