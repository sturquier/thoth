import React from 'react'
import { Avatar, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Header.scss'

export default function Header () {
  return (
    <Menu mode='horizontal' className='menu'>
      <Menu.SubMenu icon={<Avatar size='small' icon={<UserOutlined />} />} className='menu-dropdown'>
        <Menu.Item key='profile' className='menu-dropdown-item'>Mon profil</Menu.Item>
        <Menu.Item key='logout' className='menu-dropdown-item'>Déconnexion</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
