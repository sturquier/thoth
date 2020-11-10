import React, { Fragment } from 'react'

import { Header, Sidebar } from '../../components'
import './Page.scss'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function Page (props: Props) {
  return (
    <Fragment>
      <Header />
      <div className={`page ${props.className ? props.className : ''}`}>
        <Sidebar />
        <div className='page-content'>{props.children}</div>
      </div>
    </Fragment>
  )
}
