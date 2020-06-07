import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'

import { RootStore } from '../../../store'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedHome, { Home } from './Home'

describe('Home', () => {
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
      { id: 1, title: 'First article', created_at: new Date(2020, 12, 31), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', created_at: new Date(2020, 12, 30), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ],
    onFetchArticles: jest.fn()
  }

  describe('<ConnectedHome />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedHome store={store} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('<Home />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Home {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
