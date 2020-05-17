import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/register/register'
import { registerSuccess, registerFailure } from '../../actions/register/register'
import { loginRequest } from '../../actions/login/login'
import registerRootSaga, { registerSaga } from './register'

describe('Register sagas', () => {
  it('handles root saga', () => {
    const saga = registerRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.REGISTER_REQUEST, registerSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles registerSaga() on success', () => {
    const action = {
      type: 'REGISTER_REQUEST',
      payload: {
        email: 'foo@bar.com',
        password: 'fooBar1'
      }
    }
    const saga = registerSaga(action)
    const user = {
      id: 1,
      email: 'foo@bar.com'
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(user)).toEqual({
      done: false,
      value: put(registerSuccess(user))
    })

    expect(saga.next(user)).toEqual({
      done: false,
      value: put(loginRequest(action.payload))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles registerSaga() on failure', () => {
    const action = {
      type: 'REGISTER_REQUEST',
      payload: {
        email: 'foo@bar.com',
        password: 'fooBar1'
      }
    }
    const saga = registerSaga(action)
    const error = 'An error has occurred while trying to register'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(registerFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
