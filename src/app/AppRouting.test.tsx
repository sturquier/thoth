import React from 'react'
import { shallow } from 'enzyme'

import AppRouting from './AppRouting'

describe('<AppRouting />', () => {
  it('renders well', () => {
    const wrapper = shallow(<AppRouting />)
    expect(wrapper).toMatchSnapshot()
  })
})
