import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './containers/Layout/index.scss'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root')
)