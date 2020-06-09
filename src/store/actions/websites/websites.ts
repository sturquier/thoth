import { actionTypes, WebsiteType } from '../../types/websites/websites'

export const fetchWebsitesRequest = () => ({
  type: actionTypes.FETCH_WEBSITES_REQUEST
})

export const fetchWebsitesSuccess = (websites: Array<WebsiteType>) => ({
  type: actionTypes.FETCH_WEBSITES_SUCCESS,
  websites
})

export const fetchWebsitesFailure = (error: string) => ({
  type: actionTypes.FETCH_WEBSITES_FAILURE,
  error
})
