import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import articles from './articles/articles'
import register from './register/register'

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  articles,
  register
})

export type RootState = ReturnType<typeof createRootReducer>

export default createRootReducer
