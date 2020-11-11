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
    <div className='not-found-page'>
      <h1 className='not-found-page-title'>404</h1>
      <div className='not-found-page-subtitle'>
        <p className='not-found-page-subtitle-path'><code>{pathname}</code> not found.</p>
        <p className='not-found-page-subtitle-link'>Go back to <Link to='/'>homepage</Link></p>
      </div>
    </div>
  )
}
