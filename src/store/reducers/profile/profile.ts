import { actionTypes, StateType, ActionType } from '../../types/profile/profile'

export const initialState: StateType = {
  loading: false,
  profile: null,
  error: {
    code: null,
    message: null,
    errors: {
      children: {
        firstName: {},
        lastName: {},
        email: {}
      }
    }
  }
}

export default function profile (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_REQUEST:
    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.profile
      }
    case actionTypes.FETCH_PROFILE_FAILURE:
    case actionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.RESET_PROFILE_FORM_INPUT_ERROR:
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
