import { applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

declare const window: any

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

export const sagaMiddleware = createSagaMiddleware()

const middlewares = composeEnhancers(applyMiddleware(
  sagaMiddleware
))

export default middlewares
