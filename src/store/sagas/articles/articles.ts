import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes, ArticleType } from '../../types/articles/articles'
import { fetchArticlesSuccess, fetchArticlesFailure } from '../../actions/articles/articles'
import { createHttpRequest } from '../../../utils/services'
import { FETCH_ARTICLES_ENDPOINT } from '../../../config/endpoints'

export function* fetchArticlesSaga () {
  try {
    const articles: Array<ArticleType> = yield createHttpRequest(FETCH_ARTICLES_ENDPOINT, { method: 'GET' })
    yield put(fetchArticlesSuccess(articles))
  } catch (error) {
    yield put(fetchArticlesFailure(error))
  }
}

export default function* articlesRootSaga () {
  yield takeLatest(actionTypes.FETCH_ARTICLES_REQUEST, fetchArticlesSaga)
}
