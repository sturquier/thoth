import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { UnlockOutlined, UserOutlined } from '@ant-design/icons'

import { loginRequest } from '../../../store/actions/login/login'
import './Login.scss'

type Props = {
  onLoginRequest: (payload: { email: string, password: string }) => void
}

export function Login (props: Props) {
  const onFinish = (values: { email: string, password: string }) => {
    const { email, password } = values
    props.onLoginRequest({ email, password })
  }

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <Form onFinish={onFinish} className='form login-page-form' size='large'>
        <Form.Item name='email' className='form-item'>
          <Input prefix={<UserOutlined />} placeholder='Email' className='form-item-input' />
        </Form.Item>
        <Form.Item name='password' className='form-item login-page-form-password'>
          <Input.Password prefix={<UnlockOutlined />} placeholder='Password' className='form-item-input' />
        </Form.Item>
        <p className='login-page-resetPasswordLink'>
          <NavLink exact to='/reset-password'>Forgot password ?</NavLink>
        </p>
        <Form.Item className='form-item'>
          <Button htmlType='submit' className='form-item-button login-page-form-submit'>Sign in</Button>
        </Form.Item>
      </Form>
      <p className='login-page-registerLink'>No account ? <NavLink exact to='/register'>Sign up here</NavLink></p>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoginRequest: (payload: { email: string, password: string }) => dispatch(loginRequest(payload))
})

export default connect(null, mapDispatchToProps)(Login)
