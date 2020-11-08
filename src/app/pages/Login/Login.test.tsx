import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Form } from 'antd'

import { RootStore } from '../../../store'
import { actionTypes } from '../../../store/types/login/login'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedLogin, { Login } from './Login'

describe('Login', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  const props = {
    error: {
      message: ''
    },
    onResetLoginFormInputError: jest.fn(),
    onLoginRequest: jest.fn()
  }

  describe('<ConnectedLogin />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedLogin store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches LOGIN_REQUEST action type when triggering onFinish() event on form', () => {
      const wrapper = shallow(<ConnectedLogin store={store} />)
      wrapper.dive().dive().find(Form).simulate('finish', {
        email: 'foo@bar.com',
        password: 'fooBar1'
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.LOGIN_REQUEST,
            payload: {
              email: 'foo@bar.com',
              password: 'fooBar1'
            }
          })
        ])
      )
    })
  })

  describe('<Login />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Login {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
