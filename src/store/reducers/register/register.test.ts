import { registerRequest, registerSuccess, registerFailure } from '../../actions/register/register'
import reducer, { initialState } from './register'

describe('Register reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles REGISTER_REQUEST action type', () => {
    const payload = {
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
      password: 'fooBar1'
    }
    const action = registerRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles REGISTER_SUCCESS action type', () => {
    const user = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    }
    const action = registerSuccess(user)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('user', user)
  })

  it('handles REGISTER_FAILURE action type', () => {
    const error = {
      code: 400,
      message: 'Validation Failed',
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {
            errors: ['This value is already used']
          },
          password: {
            errors: ['This value is too short. It should have 7 characters or more']
          }
        }
      }
    }
    const action = registerFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
