import { call, put, takeLatest } from 'redux-saga/effects'

import { ArticleType } from '../../types/articles/articles'
import { actionTypes, FavoriteType } from '../../types/favorites/favorites'
import { fetchFavoritesSuccess, fetchFavoritesFailure, createFavoriteSuccess, createFavoriteFailure, removeFavoriteSuccess, removeFavoriteFailure } from '../../actions/favorites/favorites'
import { createHttpRequest } from '../../../utils/services'
import { FAVORITES_ENDPOINT, USER_FAVORITES_ENDPOINT } from '../../../config/endpoints'

export function* fetchFavoritesSaga () {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const favorites: Array<ArticleType> = yield call(() => createHttpRequest(USER_FAVORITES_ENDPOINT, { method: 'GET' }, token))
    yield put(fetchFavoritesSuccess(favorites))
  } catch (error) {
    yield put(fetchFavoritesFailure(error))
  }
}

export function* createFavoriteSaga (action: { type: string, payload: { article: number } }) {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const favorite: FavoriteType = yield call(() => createHttpRequest(FAVORITES_ENDPOINT, { method: 'POST', params: action.payload }, token))
    yield put(createFavoriteSuccess(favorite))
  } catch (error) {
    yield put(createFavoriteFailure(error))
  }
}

export function* removeFavoriteSaga (action: { type: string, payload: { article: number } }) {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    yield call(() => createHttpRequest(FAVORITES_ENDPOINT, { method: 'POST', params: action.payload }, token))
    yield put(removeFavoriteSuccess(action.payload.article))
  } catch (error) {
    yield put(removeFavoriteFailure(error))
  }
}

export default function* favoritesRootSaga () {
  yield takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga)
  yield takeLatest(actionTypes.CREATE_FAVORITE_REQUEST, createFavoriteSaga)
  yield takeLatest(actionTypes.REMOVE_FAVORITE_REQUEST, removeFavoriteSaga)
}
