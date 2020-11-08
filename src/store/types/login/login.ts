export const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  RESET_LOGIN_FORM_INPUT_ERROR: 'RESET_LOGIN_FORM_INPUT_ERROR',
  LOGOUT: 'LOGOUT'
}

export type StateType = {
  loading: boolean
  authenticationToken: AuthenticationTokenType
  error: LoginErrorType
}

export type ActionType = {
  type?: string
  authenticationToken?: AuthenticationTokenType
  error?: LoginErrorType
}

export type AuthenticationTokenType = {
  token: string
}

export type LoginErrorType = {
  message: string
}
