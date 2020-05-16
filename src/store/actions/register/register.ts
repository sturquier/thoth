import { actionTypes, UserType } from '../../types/register/register'

export const registerRequest = (payload: { email: string, password: string }) => ({
  type: actionTypes.REGISTER_REQUEST,
  payload
})

export const registerSuccess = (user: UserType) => ({
  type: actionTypes.REGISTER_SUCCESS,
  user
})

export const registerFailure = (error: string) => ({
  type: actionTypes.REGISTER_FAILURE,
  error
})
