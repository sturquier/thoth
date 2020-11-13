import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './Loader.scss'

type Props = {
  className?: string
}

export default function Loader (props: Props) {
  return (
    <div className={`loader-wrapper ${props.className}`}>
      <Spin
        indicator={<LoadingOutlined />}
        size='large'
        className='loader-wrapper-spinner'
      />
    </div>
  )
}

Loader.defaultProps = {
  className: 'loader-wrapper-page'
}
