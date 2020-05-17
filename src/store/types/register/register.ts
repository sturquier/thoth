export const actionTypes = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE'
}

export type StateType = {
  loading: boolean
  user: UserType
  error: string
}

export type ActionType = {
  type?: string
  user?: UserType
  error?: string
}

export type UserType = {
  id: number
  email: string
}
