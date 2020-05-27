import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './containers/Layout/index.scss'
import HookFunction from './containers/Launches/Hook'
import HookWithData from './containers/Launches/HookWithData'

  ReactDOM.render(
    <App />,
    // <HookFunction />,
    document.getElementById('root')
  )