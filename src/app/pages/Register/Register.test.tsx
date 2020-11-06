import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Form } from 'antd'

import { RootStore } from '../../../store'
import { actionTypes } from '../../../store/types/register/register'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedRegister, { Register } from './Register'

describe('<Register', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  const props = {
    onRegisterRequest: jest.fn()
  }

  describe('<ConnectedRegister />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches REGISTER_REQUEST action type when triggering onFinish() event on form', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().find(Form).simulate('finish', {
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com',
        password: 'fooBar1'
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.REGISTER_REQUEST,
            payload: {
              firstName: 'Foo',
              lastName: 'Bar',
              email: 'foo@bar.com',
              password: 'fooBar1'
            }
          })
        ])
      )
    })
  })

  describe('<Register />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Register {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
