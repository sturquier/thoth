import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { UnlockOutlined, UserOutlined } from '@ant-design/icons'

import { registerRequest } from '../../../store/actions/register/register'
import './Register.scss'

type Props = {
  onRegisterRequest: (payload: { email: string, password: string }) => void
}

export function Register (props: Props) {
  const onFinish = (values: { email: string, password: string }) => {
    const { email, password } = values
    props.onRegisterRequest({ email, password })
  }

  return (
    <div className='register-page'>
      <h1>Register</h1>
      <Form onFinish={onFinish} className='form register-page-form' size='large'>
        <Form.Item name='email' className='form-item'>
          <Input prefix={<UserOutlined />} placeholder='Email' className='form-item-input' />
        </Form.Item>
        <Form.Item name='password' className='form-item'>
          <Input.Password prefix={<UnlockOutlined />} placeholder='Password' className='form-item-input' />
        </Form.Item>
        <Form.Item className='form-item'>
          <Button htmlType='submit' className='form-item-button register-page-form-submit'>Register</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRegisterRequest: (payload: { email: string, password: string }) => dispatch(registerRequest(payload))
})

export default connect(null, mapDispatchToProps)(Register)
