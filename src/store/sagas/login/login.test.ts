import { put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { actionTypes } from '../../types/login/login'
import { loginSuccess, loginFailure } from '../../actions/login/login'
import loginRootSaga, { loginSaga, logoutSaga } from './login'

describe('Login sagas', () => {
  it('handles root saga', () => {
    const saga = loginRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)
    })

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.LOGOUT, logoutSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles loginSaga() on success', () => {
    const action = {
      type: 'LOGIN_REQUEST',
      payload: {
        email: 'foo@bar.com',
        password: 'fooBar1'
      }
    }
    const saga = loginSaga(action)
    const authenticationToken = {
      token: 'a1b2c3'
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(authenticationToken)).toHaveProperty('done', false)

    expect(saga.next(authenticationToken)).toEqual({
      done: false,
      value: put(loginSuccess(authenticationToken))
    })

    expect(saga.next()).toEqual({
      done: false,
      value: put(push('/'))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles loginSaga() on failure', () => {
    const action = {
      type: 'LOGIN_REQUEST',
      payload: {
        email: 'foo@bar.com',
        password: 'fooBar1'
      }
    }
    const saga = loginSaga(action)
    const error = 'An error has occurred while trying to login'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(loginFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles logoutSaga()', () => {
    const saga = logoutSaga()

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toEqual({
      done: false,
      value: put(push('/login'))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
