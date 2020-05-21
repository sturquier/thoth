import React from 'react'
import { shallow } from 'enzyme'

import { ChangePassword } from './ChangePassword'

describe('<ChangePassword />', () => {
  it('renders well', () => {
    const wrapper = shallow(<ChangePassword />)
    expect(wrapper).toMatchSnapshot()
  })
})
