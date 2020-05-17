import { registerRequest, registerSuccess, registerFailure } from '../../actions/register/register'
import reducer, { initialState } from './register'

describe('Register reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles REGISTER_REQUEST action type', () => {
    const payload = {
      email: 'foo@bar.com',
      password: 'fooBar1'
    }
    const action = registerRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles REGISTER_SUCCESS action type', () => {
    const user = {
      id: 1,
      email: 'foo@bar.com'
    }
    const action = registerSuccess(user)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('user', user)
  })

  it('handles REGISTER_FAILURE action type', () => {
    const error = 'An error has occurred while trying to register'
    const action = registerFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
