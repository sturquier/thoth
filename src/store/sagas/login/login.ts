import { call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { actionTypes, AuthenticationTokenType } from '../../types/login/login'
import { loginSuccess, loginFailure } from '../../actions/login/login'
import { createHttpRequest } from '../../../utils/services'
import { USERS_LOGIN_ENDPOINT } from '../../../config/endpoints'

export function* loginSaga (action: { type: 'LOGIN_REQUEST', payload: { email: string, password: string } }) {
  try {
    const authenticationToken: AuthenticationTokenType = yield call(() => createHttpRequest(USERS_LOGIN_ENDPOINT, { method: 'POST', params: action.payload }))
    yield put(loginSuccess(authenticationToken))
    yield put(push('/'))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

export default function* loginRootSaga () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)
}
