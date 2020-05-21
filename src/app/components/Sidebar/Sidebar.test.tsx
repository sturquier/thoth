import React from 'react'
import { shallow } from 'enzyme'

import Sidebar from './Sidebar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: '/'
    }
  })
}))

describe('<Sidebar />', () => {
  it('renders well', () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper).toMatchSnapshot()
  })
})
