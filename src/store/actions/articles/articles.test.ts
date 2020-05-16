import { actionTypes } from '../../types/articles/articles'
import { fetchArticlesRequest, fetchArticlesSuccess, fetchArticlesFailure } from './articles'

describe('Articles actions', () => {
  it('handles fetchArticlesRequest() action', () => {
    expect(fetchArticlesRequest()).toEqual({
      type: actionTypes.FETCH_ARTICLES_REQUEST
    })
  })

  it('handles fetchArticlesSuccess() action', () => {
    const articles = [
      { id: 1, title: 'First article', created_at: new Date(), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ]
    expect(fetchArticlesSuccess(articles)).toEqual({
      type: actionTypes.FETCH_ARTICLES_SUCCESS,
      articles
    })
  })

  it('handles fetchArticlesFailure() action', () => {
    const error = 'An error has occurred while trying to fetch articles'
    expect(fetchArticlesFailure(error)).toEqual({
      type: actionTypes.FETCH_ARTICLES_FAILURE,
      error
    })
  })
})
