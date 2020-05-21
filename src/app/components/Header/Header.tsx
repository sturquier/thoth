import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Avatar, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { logout } from '../../../store/actions/login/login'
import './Header.scss'

type Props = {
  onLogout: () => void
}

export function Header (props: Props) {
  return (
    <Menu mode='horizontal' className='menu'>
      <Menu.SubMenu icon={<Avatar size='small' icon={<UserOutlined />} />} className='menu-dropdown'>
        <Menu.Item className='menu-dropdown-item'>
          <NavLink exact to='/profile'>Profile</NavLink>
        </Menu.Item>
        <Menu.Item className='menu-dropdown-item'>
          <NavLink exact to='/change-password'>Change password</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className='menu-dropdown-item' onClick={props.onLogout}>Logout</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Header)
