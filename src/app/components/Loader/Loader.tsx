import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './Loader.scss'

export default function Loader () {
  return (
    <div className='loader-wrapper'>
      <Spin
        indicator={<LoadingOutlined />}
        size='large'
        className='loader-wrapper-spinner'
      />
    </div>
  )
}
