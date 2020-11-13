import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { UnlockOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { ProfileType, ProfileErrorType } from '../../../store/types/profile/profile'
import { resetProfileFormInputError, updateProfileRequest } from '../../../store/actions/profile/profile'
import { WithAuthentication } from '../../hoc'
import { Loader, Page } from '../../components'
import './ChangePassword.scss'

type Props = {
  loading: boolean
  profile: ProfileType
  error: ProfileErrorType
  onResetProfileFormInputError: (name: string) => void
  onUpdateProfile: (payload: { password: string }) => void
}

export function ChangePassword (props: Props) {
  const [fields, setFields] = useState([
    { name: ['password'], value: '' },
    { name: ['confirm-password'], value: '' }
  ])

  const [matchingPasswords, setMatchingPasswords] = useState(true)

  const isFormValid = () => (
    fields.every(field => field.value) &&
    props.error.errors.children.password.errors?.length === 0 &&
    matchingPasswords
  )

  const onChange = () => {
    setMatchingPasswords(true)
    props.onResetProfileFormInputError('password')
  }

  const onFinish = (fields: { password: string, confirmPassword: string }) => {
    const { password, confirmPassword } = fields

    if (password !== confirmPassword) {
      setMatchingPasswords(false)
      return
    }

    props.onUpdateProfile({ password })
  }

  return (
    <Page className='change-password-page'>
      <h1>Change password</h1>
      {props.loading && !props.profile ? (
        <Loader />
      ) : (
        <Form fields={fields} onFieldsChange={(_, allFields) => setFields(allFields)} onFinish={onFinish} className='form change-password-page-form' size='large'>
          <Form.Item name='password' className={`form-item ${(!matchingPasswords || props.error.errors.children.password.errors?.length) ? 'form-item-has-error' : ''}`}>
            <Input.Password
              name='password'
              placeholder='Password'
              prefix={<UnlockOutlined />}
              onChange={onChange}
              className={`form-item-input ${(!matchingPasswords || props.error.errors.children.password.errors?.length) ? 'form-item-input-has-error' : ''}`}
            />
          </Form.Item>
          <p className='form-error'>{!matchingPasswords && 'Passwords do not match.'}</p>
          <p className='form-error'>{props.error.errors.children.password.errors?.toString()}</p>
          <Form.Item name='confirmPassword' className={`form-item ${(!matchingPasswords || props.error.errors.children.password.errors?.length) ? 'form-item-has-error' : ''}`}>
            <Input.Password
              name='confirmPassword'
              placeholder='Confirm password'
              prefix={<UnlockOutlined />}
              onChange={onChange}
              className={`form-item-input ${(!matchingPasswords || props.error.errors.children.password.errors?.length) ? 'form-item-input-has-error' : ''}`}
            />
          </Form.Item>
          <Form.Item className='form-item'>
            <Button htmlType='submit' loading={props.loading} disabled={!isFormValid()} className='form-item-button change-password-page-form-submit'>Update</Button>
          </Form.Item>
        </Form>
      )}
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.profile.loading,
  profile: state.profile.profile,
  error: state.profile.error
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onResetProfileFormInputError: (name: string) => dispatch(resetProfileFormInputError(name)),
  onUpdateProfile: (payload: { password: string }) => dispatch(updateProfileRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(ChangePassword))
