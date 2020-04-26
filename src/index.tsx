import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import AppRouting from './app/AppRouting'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <AppRouting />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
