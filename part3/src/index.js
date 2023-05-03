import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/rootReducer';


const store = createStore(rootReducer, applyMiddleware(thunk));

const root = document.getElementById('root');
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
const rootElement = createRoot(root);
rootElement.render(app);