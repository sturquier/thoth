import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './index.scss'
import AppRouting from './app/AppRouting'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <AppContainer>
    <AppRouting />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

serviceWorker.unregister()
