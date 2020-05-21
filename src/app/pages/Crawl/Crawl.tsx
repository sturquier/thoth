import React from 'react'

import { WithAuthentication } from '../../hoc'
import { Page } from '../../components'

export function Crawl () {
  return (
    <Page>
      <h1>Crawl</h1>
    </Page>
  )
}

export default WithAuthentication(Crawl)
