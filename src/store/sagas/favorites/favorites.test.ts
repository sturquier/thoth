import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/favorites/favorites'
import { fetchFavoritesSuccess, fetchFavoritesFailure, createFavoriteSuccess, createFavoriteFailure, removeFavoriteSuccess, removeFavoriteFailure } from '../../actions/favorites/favorites'
import favoritesRootSaga, { fetchFavoritesSaga, createFavoriteSaga, removeFavoriteSaga } from './favorites'

describe('Favorites sagas', () => {
  it('handles root saga', () => {
    const saga = favoritesRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga)
    })

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.CREATE_FAVORITE_REQUEST, createFavoriteSaga)
    })

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.REMOVE_FAVORITE_REQUEST, removeFavoriteSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchFavoritesSaga() on success', () => {
    const saga = fetchFavoritesSaga()
    const favorites = [
      { id: 1, title: 'First favorite', createdAt: new Date(), url: 'https://www.foo.com/favorite' },
      { id: 2, title: 'Second favorite', description: 'Lorem Ipsum', createdAt: new Date(), url: 'https://www.bar.com/favorite', image: 'https://www.bar.com/favorite-image.jpeg' }
    ]

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(favorites)).toEqual({
      done: false,
      value: put(fetchFavoritesSuccess(favorites))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchFavoritesSaga() on failure', () => {
    const saga = fetchFavoritesSaga()
    const error = 'An error has occurred while trying to fetch favorites'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(fetchFavoritesFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles createFavoriteSaga() on success', () => {
    const action = {
      type: 'CREATE_FAVORITE_REQUEST',
      payload: {
        article: 1
      }
    }
    const saga = createFavoriteSaga(action)
    const favorite = {
      id: 1,
      favorite: {
        id: 1,
        title: 'First favorite',
        createdAt: new Date(),
        url: 'https://www.foo.com/favorite'
      }
    }

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(favorite)).toEqual({
      done: false,
      value: put(createFavoriteSuccess(favorite))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles createFavoriteSaga() on failure', () => {
    const action = {
      type: 'CREATE_FAVORITE_REQUEST',
      payload: {
        article: 1
      }
    }
    const saga = createFavoriteSaga(action)
    const error = 'An error has occurred while trying to create favorite'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(createFavoriteFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles removeFavoriteSaga() on success', () => {
    const action = {
      type: 'REMOVE_FAVORITE_REQUEST',
      payload: {
        article: 1
      }
    }
    const saga = removeFavoriteSaga(action)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(action.payload.article)).toEqual({
      done: false,
      value: put(removeFavoriteSuccess(action.payload.article))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles removeFavoriteSaga() on failure', () => {
    const action = {
      type: 'CREATE_FAVORITE_REQUEST',
      payload: {
        article: 1
      }
    }
    const saga = removeFavoriteSaga(action)
    const error = 'An error has occurred while trying to remove favorite'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(removeFavoriteFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
