import React from 'react';
import './App.css';
import LayoutContainer from './containers/Layout/index'
import {BrowserRouter} from 'react-router-dom'
// import LayoutContainer from './containers/Layout/habr'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutContainer />
      </BrowserRouter>
    </div>
  );
}

export default App
