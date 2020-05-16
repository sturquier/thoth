import React from 'react'
import { Provider } from 'react-redux'
import { Middleware } from 'redux'
import configureStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { RootStore } from '../store'
import dummyStore from '../../tests/fixtures/store'
import AppRouting from './AppRouting'
import { Home } from './pages'

describe('<AppRouting />', () => {
  const initialState = dummyStore
  const middlewares: Array<Middleware> = []
  const mockStore = configureStore(middlewares)

  let store: RootStore
  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('renders well', () => {
    const wrapper = shallow(<AppRouting />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles root path', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppRouting />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find(Home)).toHaveLength(1)
  })
})
