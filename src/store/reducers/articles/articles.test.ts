import { fetchArticlesRequest, fetchArticlesSuccess, fetchArticlesFailure } from '../../actions/articles/articles'
import reducer, { initialState } from './articles'

describe('Articles reducer', () => {
  it('provides an initial state', () => {
    expect(reducer()).toEqual(initialState)
  })

  it('handles FETCH_ARTICLES_REQUEST action type', () => {
    const action = fetchArticlesRequest()
    expect(reducer(initialState, action)).toHaveProperty('loading', true)
  })

  it('handles FETCH_ARTICLES_SUCCESS action type', () => {
    const articles = [
      { id: 1, title: 'First article', createdAt: new Date(), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', createdAt: new Date(), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ]
    const action = fetchArticlesSuccess(articles)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('articles', articles)
  })

  it('handles FETCH_ARTICLES_FAILURE action type', () => {
    const error = 'An error has occurred while trying to fetch articles'
    const action = fetchArticlesFailure(error)
    expect(reducer(initialState, action)).toHaveProperty('loading', false)
    expect(reducer(initialState, action)).toHaveProperty('error', error)
  })
})
