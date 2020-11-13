import React from 'react'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import { Form, Input } from 'antd'

import { RootStore } from '../../../store'
import { actionTypes } from '../../../store/types/profile/profile'
import dummyStore from '../../../../tests/fixtures/store'
import ConnectedChangePassword, { ChangePassword } from './ChangePassword'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: '/'
    }
  })
}))

describe('ChangePassword', () => {
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
          password: {}
        }
      }
    },
    onResetProfileFormInputError: jest.fn(),
    onUpdateProfile: jest.fn()
  }

  describe('<ConnectedChangePassword />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ConnectedChangePassword store={store} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('dispatches RESET_PROFILE_FORM_INPUT_ERROR action type when triggering onChange() event on password input', () => {
      const wrapper = shallow(<ConnectedChangePassword store={store} />)
      wrapper.dive().dive().dive().find(Input.Password).at(0).simulate('change', {
        target: {
          name: 'password'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
            name: 'password'
          })
        ])
      )
    })

    it('dispatches RESET_PROFILE_FORM_INPUT_ERROR action type when triggering onChange() event on confirmPassword input', () => {
      const wrapper = shallow(<ConnectedChangePassword store={store} />)
      wrapper.dive().dive().dive().find(Input.Password).at(1).simulate('change', {
        target: {
          name: 'confirmPassword'
        }
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.RESET_PROFILE_FORM_INPUT_ERROR,
            name: 'password'
          })
        ])
      )
    })

    it('dispatches UPDATE_PROFILE_REQUEST action type when triggering onFinish() event on form', () => {
      const wrapper = shallow(<ConnectedChangePassword store={store} />)
      wrapper.dive().dive().dive().find(Form).simulate('finish', {
        password: 'fooBar1',
        confirmPassword: 'fooBar1'
      })

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: actionTypes.UPDATE_PROFILE_REQUEST,
            payload: {
              password: 'fooBar1'
            }
          })
        ])
      )
    })
  })

  describe('<ChangePassword />', () => {
    it('renders well', () => {
      const wrapper = shallow(<ChangePassword {...props} />)
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
              password: {
                errors: ['This value is too short. It should have 7 characters or more']
              }
            }
          }
        }
      }
      const wrapper = shallow(<ChangePassword {...props} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
