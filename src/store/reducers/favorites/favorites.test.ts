import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure } from '../../actions/favorites/favorites'
import reducer, { initialState } from './favorites'

describe('Favorites reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles FETCH_FAVORITES_REQUEST action type', () => {
    const action = fetchFavoritesRequest()
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles FETCH_FAVORITES_SUCCESS action type', () => {
    const favorites = [
      { id: 1, title: 'First favorite', created_at: new Date(), url: 'https://www.foo.com/favorite' },
      { id: 2, title: 'Second favorite', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/favorite', image: 'https://www.bar.com/favorite-image.jpeg' }
    ]
    const action = fetchFavoritesSuccess(favorites)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('favorites', favorites)
  })

  it('handles FETCH_FAVORITES_FAILURE action type', () => {
    const error = 'An error has occurred while trying to fetch favorites'
    const action = fetchFavoritesFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
