import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Checkbox, Col, Row } from 'antd'

import { RootState } from '../../../store/reducers'
import { WebsiteType } from '../../../store/types/websites/websites'
import { fetchWebsitesRequest } from '../../../store/actions/websites/websites'
import { WithAuthentication } from '../../hoc'
import { Loader, Page } from '../../components'

type Props = {
  loading: boolean
  websites: Array<WebsiteType>
  onFetchWebsites: () => void
}

export function Crawler (props: Props) {
  useEffect(() => {
    props.onFetchWebsites()
  }, [])

  return (
    <Page>
      {props.loading && <Loader />}
      <h1>Crawler</h1>
      <Row gutter={[16, 16]}>
        {props.websites.map((website, i) =>
          <Col key={i} span={12}>
            <Checkbox key={i}>{website.name}</Checkbox>
          </Col>
        )}
      </Row>
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.websites.loading,
  websites: state.websites.websites
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchWebsites: () => dispatch(fetchWebsitesRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(Crawler))
