import React from 'react'
import './App.css';
import LayoutContainer from './containers/Layout/index'
import './containers/Layout/index.scss'
import { BrowserRouter } from 'react-router-dom'
import YesOrNoPreloader from './containers/Catalog/component/TestTable/exportFunc'
import HookWithData from './containers/Launches/HookWithData'
import Parall from './containers/Catalog/component/parallax'

function App() {
  let uploadedData = YesOrNoPreloader()
  
  return (
    <div className="App">
      {uploadedData[0] && uploadedData[1] && uploadedData[2]
        ? <div>
          {/* <HookWithData data0 = {uploadedData[0]} data1 = {uploadedData[1]} data2 = {uploadedData[2]}/> */}
            <BrowserRouter>
              <LayoutContainer />
            </BrowserRouter>
          </div>
        : <div id="hellopreloader">
            <div id="hellopreloader_preload">
              <div className="container">
                <div className="element"></div>
                <div className="element"></div>
                <div className="element"></div>
                <div className="element"></div>
                <div className="element"></div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default App