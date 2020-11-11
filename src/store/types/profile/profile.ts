export const actionTypes = {
  FETCH_PROFILE_REQUEST: 'FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: 'FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: 'FETCH_PROFILE_FAILURE',
  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  RESET_PROFILE_FORM_INPUT_ERROR: 'RESET_PROFILE_FORM_INPUT_ERROR'
}

export type StateType = {
  loading: boolean
  profile: ProfileType
  error: ProfileErrorType
}

export type ActionType = {
  type?: string
  profile?: ProfileType
  error?: ProfileErrorType
  name?: string
}

export type ProfileType = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type ProfileErrorType = {
  code: number
  message: string
  errors: {
    children: {
      firstName: {
        errors?: Array<string>
      }
      lastName: {
        errors?: Array<string>
      }
      email: {
        errors?: Array<string>
      }
    }
  }
}
