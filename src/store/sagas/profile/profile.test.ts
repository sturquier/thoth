import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/profile/profile'
import { fetchProfileSuccess, fetchProfileFailure, updateProfileSuccess, updateProfileFailure } from '../../actions/profile/profile'
import profileRootSaga, { fetchProfileSaga, updateProfileSaga } from './profile'

describe('Profile sagas', () => {
  it('handles root saga', () => {
    const saga = profileRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.FETCH_PROFILE_REQUEST, fetchProfileSaga)
    })

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchProfileSaga() on success', () => {
    const saga = fetchProfileSaga()
    const token = 'a1b2c3'
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(token)).toHaveProperty('done', false)

    expect(saga.next(profile)).toEqual({
      done: false,
      value: put(fetchProfileSuccess(profile))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchProfileSaga() on failure', () => {
    const saga = fetchProfileSaga()
    const error = {
      code: 400,
      message: 'Validation Failed',
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {}
        }
      }
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(fetchProfileFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles updateProfileSaga() on success', () => {
    const action = {
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'bar@foo.com'
      }
    }
    const saga = updateProfileSaga(action)
    const token = 'a1b2c3'
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'bar@foo.com'
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(token)).toHaveProperty('done', false)

    expect(saga.next(profile)).toEqual({
      done: false,
      value: put(updateProfileSuccess(profile))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles updateProfileSaga() on failure', () => {
    const action = {
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'bar@foo.com'
      }
    }
    const saga = updateProfileSaga(action)
    const error = {
      code: 400,
      message: 'Validation Failed',
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {
            errors: ['This value is already used']
          }
        }
      }
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(updateProfileFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
