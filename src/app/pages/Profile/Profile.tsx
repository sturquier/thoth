import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'

import { RootState } from '../../../store/reducers'
import { ProfileType } from '../../../store/types/profile/profile'
import { fetchProfileRequest } from '../../../store/actions/profile/profile'
import { WithAuthentication } from '../../hoc'
import { Loader, Page } from '../../components'
import './Profile.scss'

type Props = {
  loading: boolean
  profile: ProfileType
  onFetchProfile: () => void
}

export function Profile (props: Props) {
  useEffect(() => {
    props.onFetchProfile()
  }, [])

  return (
    <Page className='profile-page'>
      {props.loading && <Loader />}
      <h1>Profile</h1>
      <Form className='form profile-page-form' size='large' initialValues={props.profile}>
        <Form.Item name='firstName' className='form-item'>
          <Input
            name='firstName'
            placeholder='First name'
            prefix={<UserOutlined />}
            className='form-item-input'
          />
        </Form.Item>
        <Form.Item name='lastName' className='form-item'>
          <Input
            name='lastName'
            placeholder='Last name'
            prefix={<UserOutlined />}
            className='form-item-input'
          />
        </Form.Item>
        <Form.Item name='email' className='form-item'>
          <Input
            name='email'
            placeholder='Email'
            prefix={<MailOutlined />}
            className='form-item-input'
          />
        </Form.Item>
        <Form.Item className='form-item'>
          <Button htmlType='submit' className='form-item-button profile-page-form-submit'>Update</Button>
        </Form.Item>
      </Form>
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.profile.loading,
  profile: state.profile.profile
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchProfile: () => dispatch(fetchProfileRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(Profile))
