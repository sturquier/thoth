import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/websites/websites'
import { fetchWebsitesSuccess, fetchWebsitesFailure } from '../../actions/websites/websites'
import websitesRootSaga, { fetchWebsitesSaga } from './websites'

describe('Websites sagas', () => {
  it('handles root saga', () => {
    const saga = websitesRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.FETCH_WEBSITES_REQUEST, fetchWebsitesSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchWebsitesSaga() on success', () => {
    const saga = fetchWebsitesSaga()
    const websites = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(websites)).toEqual({
      done: false,
      value: put(fetchWebsitesSuccess(websites))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchWebsitesSaga() on failure', () => {
    const saga = fetchWebsitesSaga()
    const error = 'An error has occurred while trying to fetch websites'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(fetchWebsitesFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
