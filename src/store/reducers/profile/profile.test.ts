import { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure, updateProfileRequest, updateProfileSuccess, updateProfileFailure, resetProfileFormInputError } from '../../actions/profile/profile'
import reducer, { initialState } from './profile'

describe('Profile reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles FETCH_PROFILE_REQUEST action type', () => {
    const action = fetchProfileRequest()
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles FETCH_PROFILE_SUCCESS action type', () => {
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    }
    const action = fetchProfileSuccess(profile)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('profile', profile)
  })

  it('handles FETCH_PROFILE_FAILURE action type', () => {
    const error = {
      code: 400,
      message: 'Validation Failed',
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {},
          password: {}
        }
      }
    }
    const action = fetchProfileFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })

  it('handles UPDATE_PROFILE_REQUEST action type', () => {
    const payload = {
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'bar@foo.com'
    }
    const action = updateProfileRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles UPDATE_PROFILE_SUCCESS action type', () => {
    const profile = {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'bar@foo.com'
    }
    const action = updateProfileSuccess(profile)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('profile', profile)
  })

  it('handles UPDATE_PROFILE_FAILURE action type', () => {
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
          password: {}
        }
      }
    }
    const action = updateProfileFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })

  it('handles RESET_PROFILE_FORM_INPUT_ERROR action type', () => {
    const name = 'email'
    const action = resetProfileFormInputError(name)
    expect(reducer(initialState, action)).toHaveProperty('error', {
      code: null,
      message: null,
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {
            errors: []
          },
          password: {}
        }
      }
    })
  })
})
