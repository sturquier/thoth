import React from 'react'
import { Button, Form, Input } from 'antd'
import { UnlockOutlined, UserOutlined } from '@ant-design/icons'

import './Login.scss'

export default function Login () {
  const onFinish = (values: { email: string, password: string }) => {
    console.log(values)
  }

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <Form onFinish={onFinish} className='login-page-form'>
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
