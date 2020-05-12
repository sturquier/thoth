import React from 'react'
import { shallow } from 'enzyme'

import NotFound from './NotFound'

describe('<NotFound />', () => {
  const props = {
    location: {
      pathname: '/'
    }
  }
  it('renders well', () => {
    const wrapper = shallow(<NotFound {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
