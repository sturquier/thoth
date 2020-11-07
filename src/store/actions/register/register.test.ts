import { actionTypes } from '../../types/register/register'
import { registerRequest, registerSuccess, registerFailure, resetRegisterFormInputError } from './register'

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
    expect(registerFailure(error)).toEqual({
      type: actionTypes.REGISTER_FAILURE,
      error
    })
  })

  it('handles resetRegisterFormInputError() action', () => {
    const name = 'email'
    expect(resetRegisterFormInputError(name)).toEqual({
      type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
      name
    })
  })
})
