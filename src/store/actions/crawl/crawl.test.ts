import { actionTypes } from '../../types/crawl/crawl'
import { crawlWebsiteRequest, crawlWebsiteSuccess, crawlWebsiteFailure } from './crawl'

describe('Crawl actions', () => {
  it('handles crawlWebsiteRequest() action', () => {
    const payload = { slug: 'foo' }
    expect(crawlWebsiteRequest(payload)).toEqual({
      type: actionTypes.CRAWL_WEBSITE_REQUEST,
      payload
    })
  })

  it('handles crawlWebsiteSuccess() action', () => {
    const success = 'Website successfully crawled'
    expect(crawlWebsiteSuccess(success)).toEqual({
      type: actionTypes.CRAWL_WEBSITE_SUCCESS,
      success
    })
  })

  it('handles crawlWebsiteFailure() action', () => {
    const error = 'An error has occurred while trying to crawl website'
    expect(crawlWebsiteFailure(error)).toEqual({
      type: actionTypes.CRAWL_WEBSITE_FAILURE,
      error
    })
  })
})
