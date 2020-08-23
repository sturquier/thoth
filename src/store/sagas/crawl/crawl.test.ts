import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/crawl/crawl'
import { crawlWebsiteSuccess, crawlWebsiteFailure } from '../../actions/crawl/crawl'
import crawlRootSaga, { crawlWebsiteSaga } from './crawl'

describe('Crawl sagas', () => {
  it('handles root saga', () => {
    const saga = crawlRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.CRAWL_WEBSITE_REQUEST, crawlWebsiteSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles crawlWebsiteSaga() on success', () => {
    const action = {
      type: 'CRAWL_WEBSITE_REQUEST',
      payload: {
        slug: 'foo'
      }
    }
    const saga = crawlWebsiteSaga(action)
    const success = 'Website successfully crawled'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(success)).toEqual({
      done: false,
      value: put(crawlWebsiteSuccess(success))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles crawlWebsiteSaga() on failure', () => {
    const action = {
      type: 'CRAWL_WEBSITE_REQUEST',
      payload: {
        slug: 'foo'
      }
    }
    const saga = crawlWebsiteSaga(action)
    const error = 'An error has occurred while trying to crawl website'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(crawlWebsiteFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
