import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Checkbox, Col, Form, Row } from 'antd'

import { RootState } from '../../../store/reducers'
import { WebsiteType } from '../../../store/types/websites/websites'
import { fetchWebsitesRequest } from '../../../store/actions/websites/websites'
import { crawlWebsiteRequest } from '../../../store/actions/crawl/crawl'
import { WithAuthentication } from '../../hoc'
import { Loader, Page } from '../../components'
import './Crawler.scss'

type Props = {
  loading: boolean
  websites: Array<WebsiteType>
  onFetchWebsites: () => void
  onCrawlWebsiteRequest: (payload: { slug: string }) => void
}

export function Crawler (props: Props) {
  useEffect(() => {
    !props.websites.length && props.onFetchWebsites()
  }, [])

  const onFinish = (values: { checkboxes: Array<string> }) => {
    const { checkboxes } = values
    checkboxes && checkboxes.map((slug) => props.onCrawlWebsiteRequest({ slug }))
  }

  return (
    <Page>
      <h1>Crawler</h1>
      {props.loading ? (
        <Loader />
      ) : (
        <Form onFinish={onFinish} className='form crawler-page-form'>
          <Form.Item name='checkboxes' className='form-item'>
            <Checkbox.Group>
              <Row gutter={[16, 16]}>
                {props.websites.map((website, i) =>
                  <Col key={i} span={12}>
                    <Checkbox value={website.slug} className='form-item-checkbox'>{website.name}</Checkbox>
                  </Col>
                )}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item className='form-item'>
            <Button htmlType='submit' className='form-item-button crawler-page-form-button'>Submit</Button>
          </Form.Item>
        </Form>
      )}
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.websites.loading,
  websites: state.websites.websites
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchWebsites: () => dispatch(fetchWebsitesRequest()),
  onCrawlWebsiteRequest: (payload: { slug: string }) => dispatch(crawlWebsiteRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(Crawler))
