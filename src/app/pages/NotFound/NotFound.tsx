import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.scss'

type Props = {
  location: {
    pathname: string
  }
}

export default function NotFound (props: Props) {
  const { location: { pathname } } = props
  return (
    <div className='container'>
      <h1>404</h1>
      <div className='container-subtitle'>
        <p className='container-subtitle-path'><code>{pathname}</code> not found.</p>
        <p>Go back to <Link to='/'>homepage</Link></p>
      </div>
    </div>
  )
}
