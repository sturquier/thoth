import { actionTypes, StateType, ActionType } from '../../types/websites/websites'

export const initialState: StateType = {
  loading: false,
  websites: [],
  error: null
}

export default function websites (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_WEBSITES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_WEBSITES_SUCCESS:
      return {
        ...state,
        loading: false,
        websites: action.websites
      }
    case actionTypes.FETCH_WEBSITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
