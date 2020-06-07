import React from 'react'
import { shallow } from 'enzyme'

import Card from './Card'

describe('<Card />', () => {
  let props = {
    article: {
      id: 1,
      title: 'First article',
      created_at: new Date(),
      url: 'https://www.foo.com/article',
      website: {
        id: 1,
        name: 'Foo'
      }
    }
  }

  it('renders well', () => {
    const wrapper = shallow(<Card {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders well with a description containing less than 200 characters', () => {
    const description = 'Lorem ipsum dolor sit amet'
    props = {
      ...props,
      article: {
        ...props.article,
        description
      }
    }

    const wrapper = shallow(<Card {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders well with a description containing more than 200 characters', () => {
    const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec pharetra nibh non odio interdum, ut rutrum lacus condimentum. Nulla facilisi. Aliquam erat volutpat.
    Donec eros sapien, ultrices id sodales vitae, semper blandit lorem.`
    props = {
      ...props,
      article: {
        ...props.article,
        description
      }
    }

    const wrapper = shallow(<Card {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
