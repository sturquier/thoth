import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import WebFont from 'webfontloader'

import './index.scss'
import store from './store'
import AppRouting from './app/AppRouting'
import * as serviceWorker from './serviceWorker'

WebFont.load({
  google: {
    families: ['Merriweather', 'Open Sans']
  }
})

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <AppRouting />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

serviceWorker.unregister()
