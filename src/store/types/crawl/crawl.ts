export const actionTypes = {
  CRAWL_WEBSITE_REQUEST: 'CRAWL_WEBSITE_REQUEST',
  CRAWL_WEBSITE_SUCCESS: 'CRAWL_WEBSITE_SUCCESS',
  CRAWL_WEBSITE_FAILURE: 'CRAWL_WEBSITE_FAILURE'
}

export type StateType = {
  loading: boolean
  success: string
  error: string
}

export type ActionType = {
  type?: string
  success?: string
  error?: string
}
