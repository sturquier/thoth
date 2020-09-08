import { actionTypes } from '../../types/favorites/favorites'
import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure } from './favorites'

describe('Favorites actions', () => {
  it('handles fetchFavoritesRequest() action', () => {
    expect(fetchFavoritesRequest()).toEqual({
      type: actionTypes.FETCH_FAVORITES_REQUEST
    })
  })

  it('handles fetchFavoritesSuccess() action', () => {
    const favorites = [
      { id: 1, title: 'First favorite', created_at: new Date(), url: 'https://www.foo.com/favorite' },
      { id: 2, title: 'Second favorite', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/favorite', image: 'https://www.bar.com/favorite-image.jpeg' }
    ]
    expect(fetchFavoritesSuccess(favorites)).toEqual({
      type: actionTypes.FETCH_FAVORITES_SUCCESS,
      favorites
    })
  })

  it('handles fetchFavoritesFailure() action', () => {
    const error = 'An error has occurred while trying to fetch favorites'
    expect(fetchFavoritesFailure(error)).toEqual({
      type: actionTypes.FETCH_FAVORITES_FAILURE,
      error
    })
  })
})
