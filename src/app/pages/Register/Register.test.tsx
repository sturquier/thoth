import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Form, Input } from 'antd'

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

  let props = {
    loading: false,
    error: {
      code: null,
      message: null,
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {},
          password: {}
        }
      }
    },
    onResetRegisterFormInputError: jest.fn(),
    onRegisterRequest: jest.fn()
  }

  describe('<ConnectedRegister />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches RESET_REGISTER_FORM_INPUT_ERROR action type when triggering onChange() event on firstName input', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().dive().find(Input).at(0).simulate('change', {
        target: {
          name: 'firstName'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
            name: 'firstName'
          })
        ])
      )
    })

    it('dispatches RESET_REGISTER_FORM_INPUT_ERROR action type when triggering onChange() event on lastName input', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().dive().find(Input).at(1).simulate('change', {
        target: {
          name: 'lastName'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
            name: 'lastName'
          })
        ])
      )
    })

    it('dispatches RESET_REGISTER_FORM_INPUT_ERROR action type when triggering onChange() event on email input', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().dive().find(Input).at(2).simulate('change', {
        target: {
          name: 'email'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
            name: 'email'
          })
        ])
      )
    })

    it('dispatches RESET_REGISTER_FORM_INPUT_ERROR action type when triggering onChange() event on password input', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().dive().find(Input.Password).simulate('change', {
        target: {
          name: 'password'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_REGISTER_FORM_INPUT_ERROR,
            name: 'password'
          })
        ])
      )
    })

    it('dispatches REGISTER_REQUEST action type when triggering onFinish() event on form', () => {
      const wrapper = shallow(<ConnectedRegister store={store} />)
      wrapper.dive().dive().find(Form).simulate('finish', {
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

    it('renders well with errors', () => {
      props = {
        ...props,
        error: {
          ...props.error,
          code: 400,
          message: 'Validation Failed',
          errors: {
            children: {
              firstName: {},
              lastName: {},
              email: {
                errors: ['This value is already used']
              },
              password: {
                errors: ['This value is too short. It should have 7 characters or more']
              }
            }
          }
        }
      }
      const wrapper = shallow(<Register {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
