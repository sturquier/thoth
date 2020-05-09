import React, { Fragment } from 'react'

import { Header, Sidebar } from '../../components'
import './Page.scss'

type Props = {
  children: React.ReactNode
}

export default function Page (props: Props) {
  return (
    <Fragment>
      <Header />
      <div className='page'>
        <Sidebar />
        <div className='page-content'>{props.children}</div>
      </div>
    </Fragment>
  )
}
