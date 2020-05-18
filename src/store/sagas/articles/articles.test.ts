import { put, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../../types/articles/articles'
import { fetchArticlesSuccess, fetchArticlesFailure } from '../../actions/articles/articles'
import articlesRootSaga, { fetchArticlesSaga } from './articles'

describe('Articles sagas', () => {
  it('handles root saga', () => {
    const saga = articlesRootSaga()

    expect(saga.next()).toEqual({
      done: false,
      value: takeLatest(actionTypes.FETCH_ARTICLES_REQUEST, fetchArticlesSaga)
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchArticlesSaga() on success', () => {
    const saga = fetchArticlesSaga()
    const articles = [
      { id: 1, title: 'First article', created_at: new Date(), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ]

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next(articles)).toEqual({
      done: false,
      value: put(fetchArticlesSuccess(articles))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })

  it('handles fetchArticlesSaga() on failure', () => {
    const saga = fetchArticlesSaga()
    const error = 'An error has occurred while trying to fetch articles'

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.next()).toHaveProperty('done', false)

    expect(saga.throw(error)).toEqual({
      done: false,
      value: put(fetchArticlesFailure(error))
    })

    expect(saga.next()).toEqual({
      done: true,
      value: undefined
    })
  })
})
