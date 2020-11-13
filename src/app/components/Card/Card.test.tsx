import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import moment from 'moment'

import { RootStore } from '../../../store'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedCard, { Card } from './Card'

describe('Card', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  let props = {
    article: {
      id: 1,
      title: 'First article',
      createdAt: moment('2020-12-31').format('YYYY-MM-DD'),
      url: 'https://www.foo.com/article',
      website: {
        id: 1,
        name: 'Foo'
      }
    },
    favorites: [
      { id: 1, title: 'First article', createdAt: moment('2020-12-31').format('YYYY-MM-DD'), url: 'https://www.foo.com/article' }
    ],
    pendingFavoriteId: 2,
    onCreateFavorite: jest.fn(),
    onRemoveFavorite: jest.fn()
  }

  describe('<ConnectedCard />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedCard store={store} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('<Card />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Card {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('renders well with a description containing less than 100 characters', () => {
      const description = 'Lorem ipsum dolor sit amet'
      props = {
        ...props,
        article: {
          ...props.article,
          description
        }
      }

      const wrapper = shallow(<Card {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('renders well with a description containing more than 100 characters', () => {
      const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec pharetra nibh non odio interdum, ut rutrum lacus condimentum. Nulla facilisi. Aliquam erat volutpat.
      Donec eros sapien, ultrices id sodales vitae, semper blandit lorem.`
      props = {
        ...props,
        article: {
          ...props.article,
          description
        }
      }

      const wrapper = shallow(<Card {...props} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('renders well with pending favorite', () => {
      props = {
        ...props,
        pendingFavoriteId: 1
      }

      const wrapper = shallow(<Card {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
