import React from 'react'

import { WithAuthentication } from '../../hoc'
import { Page } from '../../components'

export function Profile () {
  return (
    <Page>
      <h1>Profile</h1>
    </Page>
  )
}

export default WithAuthentication(Profile)
