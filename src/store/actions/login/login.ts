import { actionTypes, AuthenticationTokenType } from '../../types/login/login'

export const loginRequest = (payload: { email: string, password: string }) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload
})

export const loginSuccess = (authenticationToken: AuthenticationTokenType) => ({
  type: actionTypes.LOGIN_SUCCESS,
  authenticationToken
})

export const loginFailure = (error: string) => ({
  type: actionTypes.LOGIN_FAILURE,
  error
})

export const logout = () => ({
  type: actionTypes.LOGOUT
})
