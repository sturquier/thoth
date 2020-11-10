export const actionTypes = {
  FETCH_PROFILE_REQUEST: 'FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: 'FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: 'FETCH_PROFILE_FAILURE'
}

export type StateType = {
  loading: boolean
  profile: ProfileType
  error: string
}

export type ActionType = {
  type?: string
  profile?: ProfileType
  error?: string
}

export type ProfileType = {
  id: number
  firstName: string
  lastName: string
  email: string
}
