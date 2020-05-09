import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from './Sidebar'

describe('<Sidebar />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper).toMatchSnapshot()
  })
})
