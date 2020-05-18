import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes, ArticleType } from '../../types/articles/articles'
import { fetchArticlesSuccess, fetchArticlesFailure } from '../../actions/articles/articles'
import { createHttpRequest } from '../../../utils/services'
import { ARTICLES_ENDPOINT } from '../../../config/endpoints'

export function* fetchArticlesSaga () {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const articles: Array<ArticleType> = yield call(() => createHttpRequest(ARTICLES_ENDPOINT, { method: 'GET' }, token))
    yield put(fetchArticlesSuccess(articles))
  } catch (error) {
    yield put(fetchArticlesFailure(error))
  }
}

export default function* articlesRootSaga () {
  yield takeLatest(actionTypes.FETCH_ARTICLES_REQUEST, fetchArticlesSaga)
}
