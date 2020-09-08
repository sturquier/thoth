import { actionTypes, StateType, ActionType } from '../../types/favorites/favorites'

export const initialState: StateType = {
  loading: false,
  favorites: [],
  error: null
}

export default function favorites (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.favorites
      }
    case actionTypes.FETCH_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
