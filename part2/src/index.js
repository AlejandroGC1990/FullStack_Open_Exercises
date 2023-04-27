import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.get('http://localhost:3001/persons').then(response => {
  ReactDOM.render(<App persons={response.data} />, document.getElementById('root'))
})

reportWebVitals();