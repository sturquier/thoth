import React from 'react'
import { Spin } from 'antd'

import './Loader.scss'

export default function Loader () {
  return (
    <div className='loader-wrapper'>
      <Spin size='large' className='loader-wrapper-spinner' />
    </div>
  )
}
