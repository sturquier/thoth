import React from 'react'
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
        <Menu.Item key='profile' className='menu-dropdown-item'>Profile</Menu.Item>
        <Menu.Item key='logout' className='menu-dropdown-item' onClick={props.onLogout}>Logout</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Header)
