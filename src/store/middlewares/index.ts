import { applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

declare const window: any

export const history = createBrowserHistory()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const sagaMiddleware = createSagaMiddleware()

const middlewares = composeEnhancers(applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
))

export default middlewares
