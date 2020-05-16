import { all, fork } from 'redux-saga/effects'

import articles from './articles/articles'
import register from './register/register'

export default function* rootSaga () {
  yield all([
    fork(articles),
    fork(register)
  ])
}
