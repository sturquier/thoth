import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Form, Input } from 'antd'

import { RootStore } from '../../../store'
import { actionTypes } from '../../../store/types/profile/profile'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedProfile, { Profile } from './Profile'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: '/'
    }
  })
}))

describe('Profile', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  let props = {
    loading: false,
    profile: {
      id: 1,
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'foo@bar.com'
    },
    error: {
      code: null,
      message: null,
      errors: {
        children: {
          firstName: {},
          lastName: {},
          email: {}
        }
      }
    },
    onResetProfileFormInputError: jest.fn(),
    onUpdateProfile: jest.fn()
  }

  describe('<ConnectedProfile />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedProfile store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches RESET_PROFILE_FORM_INPUT_ERROR action type when triggering onChange() event on firstName input', () => {
      const wrapper = shallow(<ConnectedProfile store={store} />)
      wrapper.dive().dive().dive().find(Input).at(0).simulate('change', {
        target: {
          name: 'firstName'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
            name: 'firstName'
          })
        ])
      )
    })

    it('dispatches RESET_PROFILE_FORM_INPUT_ERROR action type when triggering onChange() event on lastName input', () => {
      const wrapper = shallow(<ConnectedProfile store={store} />)
      wrapper.dive().dive().dive().find(Input).at(1).simulate('change', {
        target: {
          name: 'lastName'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
            name: 'lastName'
          })
        ])
      )
    })

    it('dispatches RESET_PROFILE_FORM_INPUT_ERROR action type when triggering onChange() event on email input', () => {
      const wrapper = shallow(<ConnectedProfile store={store} />)
      wrapper.dive().dive().dive().find(Input).at(2).simulate('change', {
        target: {
          name: 'email'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
            name: 'email'
          })
        ])
      )
    })

    it('dispatches UPDATE_PROFILE_REQUEST action type when triggering onFinish() event on form', () => {
      const wrapper = shallow(<ConnectedProfile store={store} />)
      wrapper.dive().dive().dive().find(Form).simulate('finish', {
        firstName: 'Foo',
        lastName: 'Bar',
        email: 'foo@bar.com'
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.UPDATE_PROFILE_REQUEST,
            payload: {
              firstName: 'Foo',
              lastName: 'Bar',
              email: 'foo@bar.com'
            }
          })
        ])
      )
    })
  })

  describe('<Profile />', () => {
    it('renders well', () => {
      const wrapper = shallow(<Profile {...props} />)
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
              }
            }
          }
        }
      }
      const wrapper = shallow(<Profile {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
