import React from 'react'
import { shallow } from 'enzyme'

import { Crawl } from './Crawl'

describe('<Crawl />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Crawl />)
    expect(wrapper).toMatchSnapshot()
  })
})
