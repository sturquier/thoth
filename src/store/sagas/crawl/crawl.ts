import { call, put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/crawl/crawl'
import { crawlWebsiteSuccess, crawlWebsiteFailure } from '../../actions/crawl/crawl'
import { createHttpRequest } from '../../../utils/services'
import { CRAWL_ENDPOINT } from '../../../config/endpoints'

export function* crawlWebsiteSaga (action: { type: string, payload: { slug: string } }) {
  try {
    const token: string = yield call(() => JSON.parse(localStorage.getItem('token')))
    const success: string = yield call(() => createHttpRequest(CRAWL_ENDPOINT, { method: 'POST', params: action.payload }, token))
    yield put(crawlWebsiteSuccess(success))
  } catch (error) {
    yield put(crawlWebsiteFailure(error))
  }
}

export default function* crawlRootSaga () {
  yield takeLatest(actionTypes.CRAWL_WEBSITE_REQUEST, crawlWebsiteSaga)
}
