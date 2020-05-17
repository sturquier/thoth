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
      <Form onFinish={onFinish} className='register-page-form'>
        <Form.Item name='email'>
          <Input prefix={<UserOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item name='password'>
          <Input.Password prefix={<UnlockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRegisterRequest: (payload: { email: string, password: string }) => dispatch(registerRequest(payload))
})

export default connect(null, mapDispatchToProps)(Register)
