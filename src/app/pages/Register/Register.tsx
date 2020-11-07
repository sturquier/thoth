import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'

import { registerRequest } from '../../../store/actions/register/register'
import './Register.scss'

type Props = {
  onRegisterRequest: (payload: { firstName: string, lastName: string, email: string, password: string }) => void
}

export function Register (props: Props) {
  const [fields, setFields] = useState([
    { name: ['firstName'], value: '' },
    { name: ['lastName'], value: '' },
    { name: ['email'], value: '' },
    { name: ['password'], value: '' }
  ])

  const isFormValid = () => fields.every(field => field.value)

  const onFinish = (fields: { firstName: string, lastName: string, email: string, password: string }) => {
    const { firstName, lastName, email, password } = fields
    props.onRegisterRequest({ firstName, lastName, email, password })
  }

  return (
    <div className='register-page'>
      <h1>Register</h1>
      <Form fields={fields} onFieldsChange={(_, allFields) => setFields(allFields)} onFinish={onFinish} className='form register-page-form' size='large'>
        <Form.Item name='firstName' className='form-item'>
          <Input prefix={<UserOutlined />} placeholder='First name' className='form-item-input' />
        </Form.Item>
        <Form.Item name='lastName' className='form-item'>
          <Input prefix={<UserOutlined />} placeholder='Last name' className='form-item-input' />
        </Form.Item>
        <Form.Item name='email' className='form-item'>
          <Input prefix={<MailOutlined />} placeholder='Email' className='form-item-input' />
        </Form.Item>
        <Form.Item name='password' className='form-item'>
          <Input.Password prefix={<UnlockOutlined />} placeholder='Password' className='form-item-input' />
        </Form.Item>
        <Form.Item className='form-item'>
          <Button htmlType='submit' className='form-item-button register-page-form-submit' disabled={!isFormValid()}>Register</Button>
        </Form.Item>
      </Form>
      <p className='register-page-loginLink'>Have an account already ? <NavLink exact to='/login'>Sign in</NavLink></p>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRegisterRequest: (payload: { firstName: string, lastName: string, email: string, password: string }) => dispatch(registerRequest(payload))
})

export default connect(null, mapDispatchToProps)(Register)
