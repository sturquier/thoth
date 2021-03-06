import { all, fork } from 'redux-saga/effects'

import articles from './articles/articles'
import crawl from './crawl/crawl'
import favorites from './favorites/favorites'
import login from './login/login'
import profile from './profile/profile'
import register from './register/register'
import websites from './websites/websites'

export default function* rootSaga () {
  yield all([
    fork(articles),
    fork(crawl),
    fork(favorites),
    fork(login),
    fork(profile),
    fork(register),
    fork(websites)
  ])
}
