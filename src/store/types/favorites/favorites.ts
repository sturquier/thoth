import { ArticleType } from '../articles/articles'

export const actionTypes = {
  FETCH_FAVORITES_REQUEST: 'FETCH_FAVORITES_REQUEST',
  FETCH_FAVORITES_SUCCESS: 'FETCH_FAVORITES_SUCCESS',
  FETCH_FAVORITES_FAILURE: 'FETCH_FAVORITES_FAILURE',
  CREATE_FAVORITE_REQUEST: 'CREATE_FAVORITE_REQUEST',
  CREATE_FAVORITE_SUCCESS: 'CREATE_FAVORITE_SUCCESS',
  CREATE_FAVORITE_FAILURE: 'CREATE_FAVORITE_FAILURE',
  REMOVE_FAVORITE_REQUEST: 'REMOVE_FAVORITE_REQUEST',
  REMOVE_FAVORITE_SUCCESS: 'REMOVE_FAVORITE_SUCCESS',
  REMOVE_FAVORITE_FAILURE: 'REMOVE_FAVORITE_FAILURE'
}

export type StateType = {
  loading: boolean
  favorites: Array<ArticleType>
  error: string
  pendingFavoriteId: number
}

export type ActionType = {
  type?: string
  id?: number
  favorites?: Array<ArticleType>
  favorite?: FavoriteType
  error?: string
  payload?: {
    article: number
  }
}

export type FavoriteType = {
  id: number
  article: ArticleType
}
