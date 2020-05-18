import React from 'react'
import { shallow } from 'enzyme'

import WithAuthentication from './WithAuthentication'

describe('<WithAuthentication />', () => {
  it('renders well', () => {
    const wrapper = shallow(<WithAuthentication />)
    expect(wrapper).toMatchSnapshot()
  })
})
