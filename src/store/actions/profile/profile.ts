import { actionTypes, ProfileType } from '../../types/profile/profile'

export const fetchProfileRequest = () => ({
  type: actionTypes.FETCH_PROFILE_REQUEST
})

export const fetchProfileSuccess = (profile: ProfileType) => ({
  type: actionTypes.FETCH_PROFILE_SUCCESS,
  profile
})

export const fetchProfileFailure = (error: string) => ({
  type: actionTypes.FETCH_PROFILE_FAILURE,
  error
})
