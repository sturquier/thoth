import React from 'react'
import { shallow } from 'enzyme'

import Page from './Page'

describe('<Page />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Page>Hello world !</Page>)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders well with className', () => {
    const wrapper = shallow(<Page className='profile-page'>Hello world !</Page>)
    expect(wrapper).toMatchSnapshot()
  })
})
