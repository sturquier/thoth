import { actionTypes, ArticleType } from '../../types/articles/articles'

export const fetchArticlesRequest = () => ({
  type: actionTypes.FETCH_ARTICLES_REQUEST
})

export const fetchArticlesSuccess = (articles: Array<ArticleType>) => ({
  type: actionTypes.FETCH_ARTICLES_SUCCESS,
  articles
})

export const fetchArticlesFailure = (error: string) => ({
  type: actionTypes.FETCH_ARTICLES_FAILURE,
  error
})
