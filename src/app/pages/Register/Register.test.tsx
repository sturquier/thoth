import React from 'react'
import { shallow } from 'enzyme'

import Register from './Register'

describe('<Register />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Register />)
    expect(wrapper).toMatchSnapshot()
  })
})
