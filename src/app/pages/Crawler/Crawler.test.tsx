import React from 'react'
import { shallow } from 'enzyme'

import { Crawler } from './Crawler'

describe('<Crawler />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Crawler />)
    expect(wrapper).toMatchSnapshot()
  })
})
