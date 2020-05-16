import { actionTypes, StateType, ActionType } from '../../types/register/register'

export const initialState: StateType = {
  loading: false,
  user: null,
  error: null
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
    default:
      return state
  }
}
