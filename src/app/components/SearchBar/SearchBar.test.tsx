import React from 'react'
import { shallow } from 'enzyme'

import SearchBar from './SearchBar'

describe('<Tabs />', () => {
  const props = {
    onChangeCallback: jest.fn()
  }

  it('renders well', () => {
    const wrapper = shallow(<SearchBar {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
