import { actionTypes, StateType, ActionType } from '../../types/articles/articles'

export const initialState: StateType = {
  loading: false,
  articles: [],
  error: null
}

export default function articles (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.articles
      }
    case actionTypes.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
