import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure, createFavoriteRequest, createFavoriteSuccess, createFavoriteFailure, removeFavoriteRequest, removeFavoriteSuccess, removeFavoriteFailure } from '../../actions/favorites/favorites'
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

  it('handles CREATE_FAVORITE_REQUEST action type', () => {
    const payload = { article: 1 }
    const action = createFavoriteRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles CREATE_FAVORITE_SUCCESS action type', () => {
    const favorite = {
      id: 1,
      article: {
        id: 1,
        title: 'First favorite',
        created_at: new Date(),
        url: 'https://www.foo.com/favorite'
      }
    }
    const action = createFavoriteSuccess(favorite)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('favorites', [
      { ...favorite.article }
    ])
  })

  it('handles CREATE_FAVORITE_FAILURE action type', () => {
    const error = 'An error has occurred while trying to create favorite'
    const action = createFavoriteFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })

  it('handles REMOVE_FAVORITE_REQUEST action type', () => {
    const payload = { article: 1 }
    const action = removeFavoriteRequest(payload)
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles REMOVE_FAVORITE_SUCCESS action type', () => {
    const id = 1
    const action = removeFavoriteSuccess(id)
    const state = {
      ...initialState,
      favorites: [
        { id: 1, title: 'First favorite', created_at: new Date(), url: 'https://www.foo.com/favorite' },
        { id: 2, title: 'Second favorite', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/favorite', image: 'https://www.bar.com/favorite-image.jpeg' }
      ]
    }
    expect(reducer(state, action)).toHaveProperty('loading', false)
    expect(reducer(state, action)).toHaveProperty('favorites', state.favorites.slice(1))
  })

  it('handles REMOVE_FAVORITE_FAILURE action type', () => {
    const error = 'An error has occurred while trying to remove favorite'
    const action = removeFavoriteFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
