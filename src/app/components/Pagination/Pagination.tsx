import React from 'react'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import './Pagination.scss'

export default function Pagination () {
  return (
    <div className='pagination'>
      <Button icon={<LeftOutlined />} className='pagination-previous' />
      <Button icon={<RightOutlined />} className='pagination-next' />
    </div>
  )
}
