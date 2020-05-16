import { actionTypes, StateType, ActionType } from '../../types/login/login'

export const initialState: StateType = {
  loading: false,
  authenticationToken: null,
  error: null
}

export default function login (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticationToken: action.authenticationToken
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
