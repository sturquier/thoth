import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes, UserType } from '../../types/register/register'
import { registerSuccess, registerFailure } from '../../actions/register/register'
import { loginRequest } from '../../actions/login/login'
import { createHttpRequest } from '../../../utils/services'
import { USERS_ENDPOINT } from '../../../config/endpoints'

export function* registerSaga (action: { type: string, payload: { email: string, password: string } }) {
  try {
    const user: UserType = yield call(() => createHttpRequest(USERS_ENDPOINT, { method: 'POST', params: action.payload }))
    yield put(registerSuccess(user))
    yield put(loginRequest(action.payload))
  } catch (error) {
    yield put(registerFailure(error))
  }
}

export default function* registerRootSaga () {
  yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga)
}
