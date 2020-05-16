import { combineReducers } from 'redux'

import articles from './articles/articles'

const createRootReducer = combineReducers({
  articles
})

export type RootState = ReturnType<typeof createRootReducer>

export default createRootReducer
