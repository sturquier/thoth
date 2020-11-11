import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes, ProfileType } from '../../types/profile/profile'
import { fetchProfileSuccess, fetchProfileFailure, updateProfileSuccess, updateProfileFailure } from '../../actions/profile/profile'
import { createHttpRequest } from '../../../utils/services'
import { USER_PROFILE_ENDPOINT } from '../../../config/endpoints'

export function* fetchProfileSaga () {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const profile: ProfileType = yield call(() => createHttpRequest(USER_PROFILE_ENDPOINT, { method: 'GET' }, token))
    yield put(fetchProfileSuccess(profile))
  } catch (error) {
    yield put(fetchProfileFailure(error))
  }
}

export function* updateProfileSaga (action: { type: string, payload: { firstName: string, lastName: string, email: string } }) {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const profile: ProfileType = yield call(() => createHttpRequest(USER_PROFILE_ENDPOINT, { method: 'PATCH', params: action.payload }, token))
    yield put(updateProfileSuccess(profile))
  } catch (error) {
    yield put(updateProfileFailure(error))
  }
}

export default function* profileRootSaga () {
  yield takeLatest(actionTypes.FETCH_PROFILE_REQUEST, fetchProfileSaga)
  yield takeLatest(actionTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga)
}
