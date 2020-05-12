import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import WebFont from 'webfontloader'

import './index.scss'
import AppRouting from './app/AppRouting'
import * as serviceWorker from './serviceWorker'

WebFont.load({
  google: {
    families: ['Merriweather', 'Open Sans']
  }
})

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
