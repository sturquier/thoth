import React, { useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { ProfileType, ProfileErrorType } from '../../../store/types/profile/profile'
import { fetchProfileRequest, resetProfileFormInputError, updateProfileRequest } from '../../../store/actions/profile/profile'
import { WithAuthentication } from '../../hoc'
import { Loader, Page } from '../../components'
import './Profile.scss'

type Props = {
  loading: boolean
  profile: ProfileType
  error: ProfileErrorType
  onFetchProfile: () => void
  onResetProfileFormInputError: (name: string) => void
  onUpdateProfile: (payload: { firstName: string, lastName: string, email: string }) => void
}

export function Profile (props: Props) {
  useEffect(() => {
    !props.profile && props.onFetchProfile()
  }, [])

  const [fields, setFields] = useState([
    { name: ['firstName'], value: '' },
    { name: ['lastName'], value: '' },
    { name: ['email'], value: '' }
  ])

  const isFormValid = () => fields.every(field => field.value) && Object.values(props.error.errors.children).filter(field => !field.errors || field.errors.length === 0).length === fields.length

  const onFinish = (fields: { firstName: string, lastName: string, email: string }) => {
    const { firstName, lastName, email } = fields
    props.onUpdateProfile({ firstName, lastName, email })
  }

  return (
    <Page className='profile-page'>
      <h1>Profile</h1>
      {props.loading && !props.profile ? (
        <Loader />
      ) : (
        <Form initialValues={props.profile} onFieldsChange={(_, allFields) => setFields(allFields)} onFinish={onFinish} className='form profile-page-form' size='large'>
          <Form.Item name='firstName' className={`form-item ${props.error?.errors.children.firstName.errors?.length ? 'form-item-has-error' : ''}`}>
            <Input
              name='firstName'
              placeholder='First name'
              prefix={<UserOutlined />}
              onChange={e => props.onResetProfileFormInputError(e.target.name)}
              className={`form-item-input ${props.error?.errors.children.firstName.errors?.length ? 'form-item-input-has-error' : ''}`}
            />
          </Form.Item>
          <p className='form-error'>{props.error?.errors.children.firstName.errors?.toString()}</p>
          <Form.Item name='lastName' className={`form-item ${props.error?.errors.children.lastName.errors?.length ? 'form-item-has-error' : ''}`}>
            <Input
              name='lastName'
              placeholder='Last name'
              prefix={<UserOutlined />}
              onChange={e => props.onResetProfileFormInputError(e.target.name)}
              className={`form-item-input ${props.error?.errors.children.lastName.errors?.length ? 'form-item-input-has-error' : ''}`}
            />
          </Form.Item>
          <p className='form-error'>{props.error?.errors.children.lastName.errors?.toString()}</p>
          <Form.Item name='email' className={`form-item ${props.error?.errors.children.email.errors?.length ? 'form-item-has-error' : ''}`}>
            <Input
              name='email'
              placeholder='Email'
              prefix={<MailOutlined />}
              onChange={e => props.onResetProfileFormInputError(e.target.name)}
              className={`form-item-input ${props.error?.errors.children.email.errors?.length ? 'form-item-input-has-error' : ''}`}
            />
          </Form.Item>
          <p className='form-error'>{props.error?.errors.children.email.errors?.toString()}</p>
          <Form.Item className='form-item'>
            <Button htmlType='submit' className='form-item-button profile-page-form-submit' disabled={!isFormValid()}>Update</Button>
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
  onFetchProfile: () => dispatch(fetchProfileRequest()),
  onResetProfileFormInputError: (name: string) => dispatch(resetProfileFormInputError(name)),
  onUpdateProfile: (payload: { firstName: string, lastName: string, email: string }) => dispatch(updateProfileRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(Profile))
