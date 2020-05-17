export const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
}

export type StateType = {
  loading: boolean
  authenticationToken: AuthenticationTokenType
  error: string
}

export type ActionType = {
  type?: string
  authenticationToken?: AuthenticationTokenType
  error?: string
}

export type AuthenticationTokenType = {
  token: string
}
