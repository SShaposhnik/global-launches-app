import React, {useState} from 'react'

import LayoutContainer from './catalog/component/Layout'
import './catalog/css/index.scss'


function App() {

  // const [preload, setPreload] = useState(false)

  // function func () {
  //   setPreload(true)
  // }
  // setTimeout(func, 3000)
  return (
    <div className="App">
      {true
        ? <div>
          <LayoutContainer />
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