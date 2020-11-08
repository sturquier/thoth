import { actionTypes, AuthenticationTokenType, LoginErrorType } from '../../types/login/login'

export const loginRequest = (payload: { email: string, password: string }) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload
})

export const loginSuccess = (authenticationToken: AuthenticationTokenType) => ({
  type: actionTypes.LOGIN_SUCCESS,
  authenticationToken
})

export const loginFailure = (error: LoginErrorType) => ({
  type: actionTypes.LOGIN_FAILURE,
  error
})

export const resetLoginFormInputError = () => ({
  type: actionTypes.RESET_LOGIN_FORM_INPUT_ERROR
})

export const logout = () => ({
  type: actionTypes.LOGOUT
})
