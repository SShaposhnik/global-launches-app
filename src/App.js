import React from 'react';
import './App.css';
// import LayoutContainer from './containers/Layout'
import MyComponent from './containers/Layout/safa'
import LayoutContainer from './containers/Layout/habr'


function App() {
  console.log("App render")
  
  return (
    <div className="App">
      <LayoutContainer />
      {/* <MyComponent /> */}
    </div>
  );
}

export default App
