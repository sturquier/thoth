import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/favorites/favorites'
import { fetchFavoritesSuccess, fetchFavoritesFailure } from '../../actions/favorites/favorites'
import favoritesRootSaga, { fetchFavoritesSaga } from './favorites'

describe('Favorites sagas', () => {
  it('handles root saga', () => {
    const saga = favoritesRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.FETCH_FAVORITES_REQUEST, fetchFavoritesSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchFavoritesSaga() on success', () => {
    const saga = fetchFavoritesSaga()
    const favorites = [
      { id: 1, title: 'First favorite', created_at: new Date(), url: 'https://www.foo.com/favorite' },
      { id: 2, title: 'Second favorite', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/favorite', image: 'https://www.bar.com/favorite-image.jpeg' }
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
})
