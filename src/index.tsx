//import react, router
import React from 'react';
import ReactDOM from 'react-dom';

//imports objetos do projeto
import App from './App';
import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
