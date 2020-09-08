import { WebsiteType } from '../websites/websites'

export const actionTypes = {
  FETCH_FAVORITES_REQUEST: 'FETCH_FAVORITES_REQUEST',
  FETCH_FAVORITES_SUCCESS: 'FETCH_FAVORITES_SUCCESS',
  FETCH_FAVORITES_FAILURE: 'FETCH_FAVORITES_FAILURE'
}

export type StateType = {
  loading: boolean
  favorites: Array<FavoriteType>
  error: string
}

export type ActionType = {
  type?: string
  favorites?: Array<FavoriteType>
  error?: string
}

export type FavoriteType = {
  id: number
  title: string
  description?: string
  created_at: Date
  url: string
  image?: string
  website: WebsiteType
}
