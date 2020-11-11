import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { MailOutlined, UnlockOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { LoginErrorType } from '../../../store/types/login/login'
import { resetLoginFormInputError, loginRequest } from '../../../store/actions/login/login'
import './Login.scss'

type Props = {
  loading: boolean
  error: LoginErrorType
  onResetLoginFormInputError: () => void
  onLoginRequest: (payload: { email: string, password: string }) => void
}

export function Login (props: Props) {
  const [fields, setFields] = useState([
    { name: ['email'], value: '' },
    { name: ['password'], value: '' }
  ])

  const isFormValid = () => fields.every(field => field.value) && !props.error.message

  const onFinish = (fields: { email: string, password: string }) => {
    const { email, password } = fields
    props.onLoginRequest({ email, password })
  }

  return (
    <div className='login-page'>
      <h1>Login</h1>
      <Form fields={fields} onFieldsChange={(_, allFields) => setFields(allFields)} onFinish={onFinish} className='form login-page-form' size='large'>
        <Form.Item name='email' className={`form-item ${props.error.message ? 'form-item-has-error' : ''}`}>
          <Input
            name='email'
            placeholder='Email'
            prefix={<MailOutlined />}
            onChange={props.onResetLoginFormInputError}
            className={`form-item-input ${props.error.message ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='form-error'>{props.error.message}</p>
        <Form.Item name='password' className='form-item login-page-form-password'>
          <Input.Password
            name='password'
            placeholder='Password'
            prefix={<UnlockOutlined />}
            onChange={props.onResetLoginFormInputError}
            className={`form-item-input ${props.error.message ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='login-page-resetPasswordLink'>
          <NavLink exact to='/reset-password'>Forgot password ?</NavLink>
        </p>
        <Form.Item className='form-item'>
          <Button htmlType='submit' loading={props.loading} disabled={!isFormValid()} className='form-item-button login-page-form-submit'>Sign in</Button>
        </Form.Item>
      </Form>
      <p className='login-page-registerLink'>No account ? <NavLink exact to='/register'>Sign up here</NavLink></p>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.login.loading,
  error: state.login.error
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onResetLoginFormInputError: () => dispatch(resetLoginFormInputError()),
  onLoginRequest: (payload: { email: string, password: string }) => dispatch(loginRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
