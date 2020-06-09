import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes, WebsiteType } from '../../types/websites/websites'
import { fetchWebsitesSuccess, fetchWebsitesFailure } from '../../actions/websites/websites'
import { createHttpRequest } from '../../../utils/services'
import { WEBSITES_ENDPOINT } from '../../../config/endpoints'

export function* fetchWebsitesSaga () {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const websites: Array<WebsiteType> = yield call(() => createHttpRequest(WEBSITES_ENDPOINT, { method: 'GET' }, token))
    yield put(fetchWebsitesSuccess(websites))
  } catch (error) {
    yield put(fetchWebsitesFailure(error))
  }
}

export default function* websitesRootSaga () {
  yield takeLatest(actionTypes.FETCH_WEBSITES_REQUEST, fetchWebsitesSaga)
}
