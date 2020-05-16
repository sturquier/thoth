import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'

import { RootStore } from '../../../store'
import dummyStore from '../../../../tests/fixtures/store'
import Home from './Home'

describe('<Home />', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  const props = {
    loading: false,
    articles: [
      { id: 1, title: 'First article', created_at: new Date(), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', created_at: new Date(), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ],
    onFetchArticles: jest.fn()
  }

  it('renders well', () => {
    const wrapper = shallow(<Home store={store} {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
