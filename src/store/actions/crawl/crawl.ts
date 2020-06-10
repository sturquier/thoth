import { actionTypes } from '../../types/crawl/crawl'

export const crawlWebsiteRequest = (payload: { slug: string }) => ({
  type: actionTypes.CRAWL_WEBSITE_REQUEST,
  payload
})

export const crawlWebsiteSuccess = (success: string) => ({
  type: actionTypes.CRAWL_WEBSITE_SUCCESS,
  success
})

export const crawlWebsiteFailure = (error: string) => ({
  type: actionTypes.CRAWL_WEBSITE_FAILURE,
  error
})
