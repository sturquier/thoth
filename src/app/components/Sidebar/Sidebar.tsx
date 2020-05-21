import React from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import { ReadOutlined, SettingOutlined } from '@ant-design/icons'

import './Sidebar.scss'

export default function Sidebar () {
  const history = useHistory()
  const { location: { pathname } } = history

  return (
    <Menu mode='inline' className='sidebar'>
      <Menu.Item className={`${pathname === '/' ? 'sidebar-item-selected' : 'sidebar-item'}`} icon={<ReadOutlined />}>
        <NavLink exact to='/'>Articles</NavLink>
      </Menu.Item>
      <Menu.Item className={`${pathname === '/crawl' ? 'sidebar-item-selected' : 'sidebar-item'}`} icon={<SettingOutlined />}>
        <NavLink exact to='/crawl'>Crawl</NavLink>
      </Menu.Item>
    </Menu>
  )
}
