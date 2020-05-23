import React from 'react'
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
        <Form.Item name='password' className='form-item'>
          <Input.Password prefix={<UnlockOutlined />} placeholder='Password' className='form-item-input' />
        </Form.Item>
        <Form.Item className='form-item'>
          <Button htmlType='submit' className='form-item-button'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoginRequest: (payload: { email: string, password: string }) => dispatch(loginRequest(payload))
})

export default connect(null, mapDispatchToProps)(Login)
