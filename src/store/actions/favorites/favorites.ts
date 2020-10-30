import { ArticleType } from '../../types/articles/articles'
import { actionTypes, FavoriteType } from '../../types/favorites/favorites'

export const fetchFavoritesRequest = () => ({
  type: actionTypes.FETCH_FAVORITES_REQUEST
})

export const fetchFavoritesSuccess = (favorites: Array<ArticleType>) => ({
  type: actionTypes.FETCH_FAVORITES_SUCCESS,
  favorites
})

export const fetchFavoritesFailure = (error: string) => ({
  type: actionTypes.FETCH_FAVORITES_FAILURE,
  error
})

export const createFavoriteRequest = (payload: { article: number }) => ({
  type: actionTypes.CREATE_FAVORITE_REQUEST,
  payload
})

export const createFavoriteSuccess = (favorite: FavoriteType) => ({
  type: actionTypes.CREATE_FAVORITE_SUCCESS,
  favorite
})

export const createFavoriteFailure = (error: string) => ({
  type: actionTypes.CREATE_FAVORITE_FAILURE,
  error
})

export const removeFavoriteRequest = (payload: { article: number }) => ({
  type: actionTypes.REMOVE_FAVORITE_REQUEST,
  payload
})

export const removeFavoriteSuccess = (id: number) => ({
  type: actionTypes.REMOVE_FAVORITE_SUCCESS,
  id
})

export const removeFavoriteFailure = (error: string) => ({
  type: actionTypes.REMOVE_FAVORITE_FAILURE,
  error
})
