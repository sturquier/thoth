import { loginRequest, loginSuccess, loginFailure, resetLoginFormInputError, logout } from '../../actions/login/login'
import reducer, { initialState } from './login'

describe('Login reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles LOGIN_REQUEST action type', () => {
    const payload = {
      email: 'foo@bar.com',
      password: 'fooBar1'
    }
    const action = loginRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles LOGIN_SUCCESS action type', () => {
    const authenticationToken = {
      token: 'a1b2c3'
    }
    const action = loginSuccess(authenticationToken)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('authenticationToken', authenticationToken)
  })

  it('handles LOGIN_FAILURE action type', () => {
    const error = {
      message: 'Invalid credentials'
    }
    const action = loginFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })

  it('handles RESET_LOGIN_FORM_INPUT_ERROR action type', () => {
    const action = resetLoginFormInputError()
    expect(reducer(initialState, action)).toHaveProperty('error', initialState.error)
  })

  it('handles LOGOUT action type', () => {
    const action = logout()
    expect(reducer(initialState, action)).toEqual(initialState)
  })
})
