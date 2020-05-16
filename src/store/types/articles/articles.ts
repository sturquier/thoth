export const actionTypes = {
  FETCH_ARTICLES_REQUEST: 'FETCH_ARTICLES_REQUEST',
  FETCH_ARTICLES_SUCCESS: 'FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_FAILURE: 'FETCH_ARTICLES_FAILURE'
}

export type StateType = {
  loading: boolean
  articles: Array<ArticleType>
  error: string
}

export type ActionType = {
  type?: string
  articles?: Array<ArticleType>
  error?: string
}

export type ArticleType = {
  id: number
  title: string
  description?: string
  created_at: Date
  url: string
  image?: string
}
