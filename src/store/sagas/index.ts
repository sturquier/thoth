import { all, fork } from 'redux-saga/effects'

import articles from './articles/articles'

export default function* rootSaga () {
  yield all([
    fork(articles)
  ])
}
