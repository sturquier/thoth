import { all, fork } from 'redux-saga/effects'

import articles from './articles/articles'
import crawl from './crawl/crawl'
import login from './login/login'
import register from './register/register'
import websites from './websites/websites'

export default function* rootSaga () {
  yield all([
    fork(articles),
    fork(crawl),
    fork(login),
    fork(register),
    fork(websites)
  ])
}
