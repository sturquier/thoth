import React from 'react'
import { shallow } from 'enzyme'

import Home from './Home'

describe('<Home />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).toMatchSnapshot()
  })
})
