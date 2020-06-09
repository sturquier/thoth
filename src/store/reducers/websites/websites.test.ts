import { fetchWebsitesRequest, fetchWebsitesSuccess, fetchWebsitesFailure } from '../../actions/websites/websites'
import reducer, { initialState } from './websites'

describe('Websites reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles FETCH_WEBSITES_REQUEST action type', () => {
    const action = fetchWebsitesRequest()
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles FETCH_WEBSITES_SUCCESS action type', () => {
    const websites = [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ]
    const action = fetchWebsitesSuccess(websites)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('websites', websites)
  })

  it('handles FETCH_WEBSITES_FAILURE action type', () => {
    const error = 'An error has occurred while trying to fetch websites'
    const action = fetchWebsitesFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
