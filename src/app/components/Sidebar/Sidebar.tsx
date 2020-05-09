import React from 'react'
import { Menu } from 'antd'
import { ReadOutlined } from '@ant-design/icons'

import './Sidebar.scss'

export default function Sidebar () {
  return (
    <Menu mode='inline' className='sidebar'>
      <Menu.Item key='articles' icon={<ReadOutlined />}>Articles</Menu.Item>
    </Menu>
  )
}
