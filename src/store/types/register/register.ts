export const actionTypes = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  RESET_REGISTER_FORM_INPUT_ERROR: 'RESET_REGISTER_FORM_INPUT_ERROR'
}

export type StateType = {
  loading: boolean
  user: UserType
  error: RegisterErrorType
}

export type ActionType = {
  type?: string
  user?: UserType
  error?: RegisterErrorType
  name?: string
}

export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type RegisterErrorType = {
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
      password: {
        errors?: Array<string>
      }
    }
  }
}
