import { actionTypes } from '../../types/login/login'
import { loginRequest, loginSuccess, loginFailure, resetLoginFormInputError, logout } from './login'

describe('Login actions', () => {
  it('handles loginRequest() action', () => {
    const payload = {
      email: 'foo@bar.com',
      password: 'fooBar1'
    }
    expect(loginRequest(payload)).toEqual({
      type: actionTypes.LOGIN_REQUEST,
      payload
    })
  })

  it('handles loginSuccess() action', () => {
    const authenticationToken = {
      token: 'a1b2c3'
    }
    expect(loginSuccess(authenticationToken)).toEqual({
      type: actionTypes.LOGIN_SUCCESS,
      authenticationToken
    })
  })

  it('handles loginFailure() action', () => {
    const error = {
      message: 'Invalid credentials'
    }
    expect(loginFailure(error)).toEqual({
      type: actionTypes.LOGIN_FAILURE,
      error
    })
  })

  it('handles resetLoginFormInputError() action', () => {
    expect(resetLoginFormInputError()).toEqual({
      type: actionTypes.RESET_LOGIN_FORM_INPUT_ERROR
    })
  })

  it('handles logout() action', () => {
    expect(logout()).toEqual({
      type: actionTypes.LOGOUT
    })
  })
})
