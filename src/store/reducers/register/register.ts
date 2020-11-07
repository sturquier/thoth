import { actionTypes, StateType, ActionType } from '../../types/register/register'

export const initialState: StateType = {
  loading: false,
  user: null,
  error: {
    code: null,
    message: null,
    errors: {
      children: {
        firstName: {},
        lastName: {},
        email: {},
        password: {}
      }
    }
  }
}

export default function register (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      }
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.RESET_REGISTER_FORM_INPUT_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          errors: {
            ...state.error.errors,
            children: {
              ...state.error.errors.children,
              [action.name]: {
                errors: []
              }
            }
          }
        }
      }
    default:
      return state
  }
}
