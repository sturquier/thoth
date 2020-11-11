import { actionTypes } from '../../types/profile/profile'
import { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure, updateProfileRequest, updateProfileSuccess, updateProfileFailure, resetProfileFormInputError } from './profile'

describe('Profile actions', () => {
  it('handles fetchProfileRequest() action', () => {
    expect(fetchProfileRequest()).toEqual({
      type: actionTypes.FETCH_PROFILE_REQUEST
    })
  })

  it('handles fetchProfileSuccess() action', () => {
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    }
    expect(fetchProfileSuccess(profile)).toEqual({
      type: actionTypes.FETCH_PROFILE_SUCCESS,
      profile
    })
  })

  it('handles fetchProfileFailure() action', () => {
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
    expect(fetchProfileFailure(error)).toEqual({
      type: actionTypes.FETCH_PROFILE_FAILURE,
      error
    })
  })

  it('handles updateProfileRequest() action', () => {
    const payload = {
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'bar@foo.com'
    }
    expect(updateProfileRequest(payload)).toEqual({
      type: actionTypes.UPDATE_PROFILE_REQUEST,
      payload
    })
  })

  it('handles updateProfileSuccess() action', () => {
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'bar@foo.com'
    }
    expect(updateProfileSuccess(profile)).toEqual({
      type: actionTypes.UPDATE_PROFILE_SUCCESS,
      profile
    })
  })

  it('handles updateProfileFailure() action', () => {
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
    expect(updateProfileFailure(error)).toEqual({
      type: actionTypes.UPDATE_PROFILE_FAILURE,
      error
    })
  })

  it('handles resetProfileFormInputError() action', () => {
    const name = 'email'
    expect(resetProfileFormInputError(name)).toEqual({
      type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
      name
    })
  })
})
