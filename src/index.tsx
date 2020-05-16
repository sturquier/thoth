import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { AppContainer } from 'react-hot-loader'
import WebFont from 'webfontloader'

import './index.scss'
import store from './store'
import { history } from './store/middlewares'
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
      <ConnectedRouter history={history}>
        <AppRouting />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

serviceWorker.unregister()
