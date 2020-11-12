import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'

import { RootStore } from '../../../store'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedCrawler, { Crawler } from './Crawler'

describe('Crawler', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  const props = {
    loadingWebsites: false,
    websites: [
      { id: 1, name: 'Foo' },
      { id: 2, name: 'Bar' }
    ],
    loadingCrawl: false,
    onFetchWebsites: jest.fn(),
    onCrawlWebsiteRequest: jest.fn()
  }

  describe('<ConnectedCrawler />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedCrawler store={store} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('<Crawler />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Crawler {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
