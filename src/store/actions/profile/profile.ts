import { actionTypes, ProfileType, ProfileErrorType } from '../../types/profile/profile'

export const fetchProfileRequest = () => ({
  type: actionTypes.FETCH_PROFILE_REQUEST
})

export const fetchProfileSuccess = (profile: ProfileType) => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  profile
})

export const fetchProfileFailure = (error: ProfileErrorType) => ({
  type: actionTypes.FETCH_PROFILE_FAILURE,
  error
})

export const updateProfileRequest = (payload: { firstName: string, lastName: string, email: string }) => ({
  type: actionTypes.UPDATE_PROFILE_REQUEST,
  payload
})

export const updateProfileSuccess = (profile: ProfileType) => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
  profile
})

export const updateProfileFailure = (error: ProfileErrorType) => ({
  type: actionTypes.UPDATE_PROFILE_FAILURE,
  error
})

export const resetProfileFormInputError = (name: string) => ({
  type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
  name
})
