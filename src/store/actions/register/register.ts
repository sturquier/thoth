import { actionTypes, UserType, RegisterErrorType } from '../../types/register/register'

export const registerRequest = (payload: { firstName: string, lastName: string, email: string, password: string }) => ({
  type: actionTypes.REGISTER_REQUEST,
  payload
})

export const registerSuccess = (user: UserType) => ({
  type: actionTypes.REGISTER_SUCCESS,
  user
})

export const registerFailure = (error: RegisterErrorType) => ({
  type: actionTypes.REGISTER_FAILURE,
  error
})

export const resetRegisterFormInputError = (name: string) => ({
  type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
  name
})
