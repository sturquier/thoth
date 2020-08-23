import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import Tabs from './Tabs'

describe('<Tabs />', () => {
  const props = {
    articles: [
      { id: 1, title: 'First article', created_at: moment('2020-12-31').format('YYYY-MM-DD'), url: 'https://www.foo.com/article' },
      { id: 2, title: 'Second article', description: 'Lorem Ipsum', created_at: moment('2020-12-30').format('YYYY-MM-DD'), url: 'https://www.bar.com/article', image: 'https://www.bar.com/article-image.jpeg' }
    ],
    favorites: [
      { id: 1, title: 'First article', created_at: moment('2020-12-31').format('YYYY-MM-DD'), url: 'https://www.foo.com/article' }
    ]
  }

  it('renders well', () => {
    const wrapper = shallow(<Tabs {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
