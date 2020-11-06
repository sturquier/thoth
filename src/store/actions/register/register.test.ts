import { actionTypes } from '../../types/register/register'
import { registerRequest, registerSuccess, registerFailure } from './register'

describe('Register actions', () => {
  it('handles registerRequest() action', () => {
    const payload = {
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com',
      password: 'fooBar1'
    }
    expect(registerRequest(payload)).toEqual({
      type: actionTypes.REGISTER_REQUEST,
      payload
    })
  })

  it('handles registerSuccess() action', () => {
    const user = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    }
    expect(registerSuccess(user)).toEqual({
      type: actionTypes.REGISTER_SUCCESS,
      user
    })
  })

  it('handles registerFailure() action', () => {
    const error = 'An error has occurred while trying to register'
    expect(registerFailure(error)).toEqual({
      type: actionTypes.REGISTER_FAILURE,
      error
    })
  })
})
