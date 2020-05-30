import React from 'react'

import { WithAuthentication } from '../../hoc'
import { Page } from '../../components'

export function Crawler () {
  return (
    <Page>
      <h1>Crawler</h1>
    </Page>
  )
}

export default WithAuthentication(Crawler)
