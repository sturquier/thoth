import { crawlWebsiteRequest, crawlWebsiteSuccess, crawlWebsiteFailure } from '../../actions/crawl/crawl'
import reducer, { initialState } from './crawl'

describe('Crawl reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles CRAWL_WEBSITE_REQUEST action type', () => {
    const payload = { slug: 'foo' }
    const action = crawlWebsiteRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles CRAWL_WEBSITE_SUCCESS action type', () => {
    const success = 'Website successfully crawled'
    const action = crawlWebsiteSuccess(success)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('success', success)
  })

  it('handles CRAWL_WEBSITE_FAILURE action type', () => {
    const error = 'An error has occurred while trying to crawl website'
    const action = crawlWebsiteFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
