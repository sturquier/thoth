import React, { ChangeEvent } from 'react'
import { Input } from 'antd'

import './SearchBar.scss'

type Props = {
  onChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBar (props: Props) {
  return (
    <Input.Search
      onChange={props.onChangeCallback}
      placeholder='Search for an article'
      className='input-search'
      allowClear
      enterButton
    />
  )
}
