import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Menu } from 'antd'

import { RootStore } from '../../../store'
import { actionTypes } from '../../../store/types/login/login'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedHeader, { Header } from './Header'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: '/'
    }
  })
}))

describe('Header', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  const props = {
    profile: {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    },
    onFetchProfile: jest.fn(),
    onLogout: jest.fn()
  }

  describe('<ConnectedHeader />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedHeader store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches LOGOUT action type when triggering onClick() event on logout menu item', () => {
      const wrapper = shallow(<ConnectedHeader store={store} />)
      wrapper.dive().dive().find(Menu.Item).at(3).simulate('click')

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.LOGOUT
          })
        ])
      )
    })
  })

  describe('<Header />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Header {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
