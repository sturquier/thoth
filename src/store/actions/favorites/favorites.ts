import { actionTypes, FavoriteType } from '../../types/favorites/favorites'

export const fetchFavoritesRequest = () => ({
  type: actionTypes.FETCH_FAVORITES_REQUEST
})

export const fetchFavoritesSuccess = (favorites: Array<FavoriteType>) => ({
  type: actionTypes.FETCH_FAVORITES_SUCCESS,
  favorites
})

export const fetchFavoritesFailure = (error: string) => ({
  type: actionTypes.FETCH_FAVORITES_FAILURE,
  error
})
