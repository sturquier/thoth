import React from 'react'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import AppRouting from './AppRouting'
import { Home } from './pages'

describe('<AppRouting />', () => {
  it('renders well', () => {
    const wrapper = shallow(<AppRouting />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles root path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <AppRouting />
      </MemoryRouter>
    )
    expect(wrapper.find(Home)).toHaveLength(1)
  })
})
