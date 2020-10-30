import { actionTypes } from '../../types/favorites/favorites'
import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure, createFavoriteRequest, createFavoriteSuccess, createFavoriteFailure, removeFavoriteRequest, removeFavoriteSuccess, removeFavoriteFailure } from './favorites'

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

  it('handles createFavoriteRequest() action', () => {
    const payload = { article: 1 }
    expect(createFavoriteRequest(payload)).toEqual({
      type: actionTypes.CREATE_FAVORITE_REQUEST,
      payload
    })
  })

  it('handles createFavoriteSuccess() action', () => {
    const favorite = {
      id: 1,
      article: {
        id: 1,
        title: 'First favorite',
        created_at: new Date(),
        url: 'https://www.foo.com/favorite'
      }
    }
    expect(createFavoriteSuccess(favorite)).toEqual({
      type: actionTypes.CREATE_FAVORITE_SUCCESS,
      favorite
    })
  })

  it('handles createFavoriteFailure() action', () => {
    const error = 'An error has occurred while trying to create favorite'
    expect(createFavoriteFailure(error)).toEqual({
      type: actionTypes.CREATE_FAVORITE_FAILURE,
      error
    })
  })

  it('handles removeFavoriteRequest() action', () => {
    const payload = { article: 1 }
    expect(removeFavoriteRequest(payload)).toEqual({
      type: actionTypes.REMOVE_FAVORITE_REQUEST,
      payload
    })
  })

  it('handles removeFavoriteSuccess() action', () => {
    const id = 1
    expect(removeFavoriteSuccess(id)).toEqual({
      type: actionTypes.REMOVE_FAVORITE_SUCCESS,
      id
    })
  })

  it('handles removeFavoriteFailure() action', () => {
    const error = 'An error has occurred while trying to remove favorite'
    expect(removeFavoriteFailure(error)).toEqual({
      type: actionTypes.REMOVE_FAVORITE_FAILURE,
      error
    })
  })
})
