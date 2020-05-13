import React from 'react'
import { Avatar, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Header.scss'

export default function Header () {
  return (
    <Menu mode='horizontal' className='menu'>
      <Menu.SubMenu icon={<Avatar size='small' icon={<UserOutlined />} />} className='menu-dropdown'>
        <Menu.Item key='profile' className='menu-dropdown-item'>Profile</Menu.Item>
        <Menu.Item key='logout' className='menu-dropdown-item'>Logout</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
