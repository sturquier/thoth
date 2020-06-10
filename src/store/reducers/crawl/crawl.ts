import { actionTypes, StateType, ActionType } from '../../types/crawl/crawl'

export const initialState: StateType = {
  loading: false,
  success: null,
  error: null
}

export default function crawl (state = initialState, action: ActionType = {}) {
  switch (action.type) {
    case actionTypes.CRAWL_WEBSITE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CRAWL_WEBSITE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success
      }
    case actionTypes.CRAWL_WEBSITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
