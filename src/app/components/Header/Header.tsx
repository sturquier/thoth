import React, { useEffect } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Avatar, Menu } from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { ProfileType } from '../../../store/types/profile/profile'
import { fetchProfileRequest } from '../../../store/actions/profile/profile'
import { logout } from '../../../store/actions/login/login'
import './Header.scss'

type Props = {
  profile: ProfileType
  onFetchProfile: () => void
  onLogout: () => void
}

export function Header (props: Props) {
  const history = useHistory()
  const { location: { pathname } } = history
  const { profile } = props

  useEffect(() => {
    !profile && props.onFetchProfile()
  }, [])

  const getInitials = () => `${profile.firstName.substr(0, 1)}${profile.lastName.substr(0, 1)}`

  const getIcon = () => profile ? <Avatar className='menu-dropdown-initials'>{getInitials()}</Avatar> : <Avatar icon={<UserOutlined className='menu-dropdown-icon' />} />

  return (
    <Menu mode='horizontal' className='menu'>
      <Menu.Item className='menu-logo'>
        <NavLink exact to='/'>
          <Avatar icon={<MenuOutlined />} className='menu-logo-icon' />
        </NavLink>
      </Menu.Item>
      <Menu.SubMenu icon={getIcon()} className='menu-dropdown'>
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

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.profile
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchProfile: () => dispatch(fetchProfileRequest()),
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
