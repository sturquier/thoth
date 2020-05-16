import { combineReducers } from 'redux'

import articles from './articles/articles'
import register from './register/register'

const createRootReducer = combineReducers({
  articles,
  register
})

export type RootState = ReturnType<typeof createRootReducer>

export default createRootReducer
