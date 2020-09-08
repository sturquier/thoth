import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes, FavoriteType } from '../../types/favorites/favorites'
import { fetchFavoritesSuccess, fetchFavoritesFailure } from '../../actions/favorites/favorites'
import { createHttpRequest } from '../../../utils/services'
import { FAVORITES_ENDPOINT } from '../../../config/endpoints'

export function* fetchFavoritesSaga () {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const favorites: Array<FavoriteType> = yield call(() => createHttpRequest(FAVORITES_ENDPOINT, { method: 'GET' }, token))
    yield put(fetchFavoritesSuccess(favorites))
  } catch (error) {
    yield put(fetchFavoritesFailure(error))
  }
}

export default function* favoritesRootSaga () {
  yield takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga)
}
