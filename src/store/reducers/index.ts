import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import articles from './articles/articles'
import crawl from './crawl/crawl'
import login from './login/login'
import register from './register/register'
import websites from './websites/websites'

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  articles,
  crawl,
  login,
  register,
  websites
})

export type RootState = ReturnType<typeof createRootReducer>

export default createRootReducer
