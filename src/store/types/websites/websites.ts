export const actionTypes = {
  FETCH_WEBSITES_REQUEST: 'FETCH_WEBSITES_REQUEST',
  FETCH_WEBSITES_SUCCESS: 'FETCH_WEBSITES_SUCCESS',
  FETCH_WEBSITES_FAILURE: 'FETCH_WEBSITES_FAILURE'
}

export type StateType = {
  loading: boolean
  websites: Array<WebsiteType>
  error: string
}

export type ActionType = {
  type?: string
  websites?: Array<WebsiteType>
  error?: string
}

export type WebsiteType = {
  id: number
  name: string
  slug: string
}
