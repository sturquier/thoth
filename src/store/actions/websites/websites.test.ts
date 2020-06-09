import { actionTypes } from '../../types/websites/websites'
import { fetchWebsitesRequest, fetchWebsitesSuccess, fetchWebsitesFailure } from './websites'

describe('Websites actions', () => {
  it('handles fetchWebsitesRequest() action', () => {
    expect(fetchWebsitesRequest()).toEqual({
      type: actionTypes.FETCH_WEBSITES_REQUEST
    })
  })

  it('handles fetchWebsitesSuccess() action', () => {
    const websites = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]
    expect(fetchWebsitesSuccess(websites)).toEqual({
      type: actionTypes.FETCH_WEBSITES_SUCCESS,
      websites
    })
  })

  it('handles fetchWebsitesFailure() action', () => {
    const error = 'An error has occurred while trying to fetch websites'
    expect(fetchWebsitesFailure(error)).toEqual({
      type: actionTypes.FETCH_WEBSITES_FAILURE,
      error
    })
  })
})
