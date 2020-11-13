import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { MailOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { RegisterErrorType } from '../../../store/types/register/register'
import { resetRegisterFormInputError, registerRequest } from '../../../store/actions/register/register'
import './Register.scss'

type Props = {
  loading: boolean
  error: RegisterErrorType
  onResetRegisterFormInputError: (name: string) => void
  onRegisterRequest: (payload: { firstName: string, lastName: string, email: string, password: string }) => void
}

export function Register (props: Props) {
  const [fields, setFields] = useState([
    { name: ['firstName'], value: '' },
    { name: ['lastName'], value: '' },
    { name: ['email'], value: '' },
    { name: ['password'], value: '' }
  ])

  const isFormValid = () => fields.every(field => field.value) && Object.values(props.error.errors.children).filter(field => !field.errors || field.errors.length === 0).length === fields.length

  const onFinish = (fields: { firstName: string, lastName: string, email: string, password: string }) => {
    const { firstName, lastName, email, password } = fields
    props.onRegisterRequest({ firstName, lastName, email, password })
  }

  return (
    <div className='register-page'>
      <h1>Register</h1>
      <Form fields={fields} onFieldsChange={(_, allFields) => setFields(allFields)} onFinish={onFinish} className='form register-page-form' size='large'>
        <Form.Item name='firstName' className={`form-item ${props.error.errors.children.firstName.errors?.length ? 'form-item-has-error' : ''}`}>
          <Input
            name='firstName'
            placeholder='First name'
            prefix={<UserOutlined />}
            onChange={e => props.onResetRegisterFormInputError(e.target.name)}
            className={`form-item-input ${props.error.errors.children.firstName.errors?.length ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='form-error'>{props.error.errors.children.firstName.errors?.toString()}</p>
        <Form.Item name='lastName' className={`form-item ${props.error.errors.children.lastName.errors?.length ? 'form-item-has-error' : ''}`}>
          <Input
            name='lastName'
            placeholder='Last name'
            prefix={<UserOutlined />}
            onChange={e => props.onResetRegisterFormInputError(e.target.name)}
            className={`form-item-input ${props.error.errors.children.lastName.errors?.length ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='form-error'>{props.error.errors.children.lastName.errors?.toString()}</p>
        <Form.Item name='email' className={`form-item ${props.error.errors.children.email.errors?.length ? 'form-item-has-error' : ''}`}>
          <Input
            name='email'
            placeholder='Email'
            prefix={<MailOutlined />}
            onChange={e => props.onResetRegisterFormInputError(e.target.name)}
            className={`form-item-input ${props.error.errors.children.email.errors?.length ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='form-error'>{props.error.errors.children.email.errors?.toString()}</p>
        <Form.Item name='password' className={`form-item ${props.error.errors.children.password.errors?.length ? 'form-item-has-error' : ''}`}>
          <Input.Password
            name='password'
            placeholder='Password'
            prefix={<UnlockOutlined />}
            onChange={e => props.onResetRegisterFormInputError(e.target.name)}
            className={`form-item-input ${props.error.errors.children.password.errors?.length ? 'form-item-input-has-error' : ''}`}
          />
        </Form.Item>
        <p className='form-error'>{props.error.errors.children.password.errors?.toString()}</p>
        <Form.Item className='form-item'>
          <Button htmlType='submit' loading={props.loading} disabled={!isFormValid()} className='form-item-button register-page-form-submit'>Register</Button>
        </Form.Item>
      </Form>
      <p className='register-page-loginLink'>Have an account already ? <NavLink exact to='/login'>Sign in</NavLink></p>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.register.loading,
  error: state.register.error
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onResetRegisterFormInputError: (name: string) => dispatch(resetRegisterFormInputError(name)),
  onRegisterRequest: (payload: { firstName: string, lastName: string, email: string, password: string }) => dispatch(registerRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
