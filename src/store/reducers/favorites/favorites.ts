import { actionTypes, StateType, ActionType } from '../../types/favorites/favorites'

export const initialState: StateType = {
  loading: false,
  favorites: [],
  error: null
}

export default function favorites (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_FAVORITES_REQUEST:
    case actionTypes.CREATE_FAVORITE_REQUEST:
    case actionTypes.REMOVE_FAVORITE_REQUEST:
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
    case actionTypes.CREATE_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: [...state.favorites, action.favorite.article]
      }
    case actionTypes.REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: [...state.favorites.filter(favorite => favorite.id !== action.id)]
      }
    case actionTypes.FETCH_FAVORITES_FAILURE:
    case actionTypes.CREATE_FAVORITE_FAILURE:
    case actionTypes.REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
