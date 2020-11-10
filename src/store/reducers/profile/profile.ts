import { actionTypes, StateType, ActionType } from '../../types/profile/profile'

export const initialState: StateType = {
  loading: false,
  profile: {},
  error: null
}

export default function profile (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.profile
      }
    case actionTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
