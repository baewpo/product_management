import React, { ReactElement } from 'react'
import "./App.scss";
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

function App(): ReactElement {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App;
