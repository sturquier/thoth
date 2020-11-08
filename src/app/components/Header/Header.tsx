import React from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Avatar, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import logo from '../../../../public/logo.svg'
import { logout } from '../../../store/actions/login/login'
import './Header.scss'

type Props = {
  onLogout: () => void
}

export function Header (props: Props) {
  const history = useHistory()
  const { location: { pathname } } = history

  return (
    <Menu mode='horizontal' className='menu'>
      <Menu.Item className='menu-logo'>
        <NavLink exact to='/'>
          <Avatar size={46} src={logo} />
        </NavLink>
      </Menu.Item>
      <Menu.SubMenu icon={<Avatar icon={<UserOutlined className='menu-dropdown-icon' />} />} className='menu-dropdown'>
        <Menu.Item className={`${pathname === '/profile' ? 'menu-dropdown-item-selected' : 'menu-dropdown-item'}`}>
          <NavLink exact to='/profile'>Profile</NavLink>
        </Menu.Item>
        <Menu.Item className={`${pathname === '/change-password' ? 'menu-dropdown-item-selected' : 'menu-dropdown-item'}`}>
          <NavLink exact to='/change-password'>Change password</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className='menu-dropdown-item' onClick={props.onLogout}>
          <div>Logout</div>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Header)
