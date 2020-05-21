import React from 'react'

import { WithAuthentication } from '../../hoc'
import { Page } from '../../components'

export function ChangePassword () {
  return (
    <Page>
      <h1>Change password</h1>
    </Page>
  )
}

export default WithAuthentication(ChangePassword)
