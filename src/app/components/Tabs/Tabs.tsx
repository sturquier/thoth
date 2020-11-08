import React from 'react'
import { Col, Row, Tabs as AntdTabs } from 'antd'

import { ArticleType } from '../../../store/types/articles/articles'
import { Card } from '../'
import './Tabs.scss'

type Props = {
  articles: Array<ArticleType>
  favorites: Array<ArticleType>
}

export default function Tabs (props: Props) {
  return (
    <AntdTabs defaultActiveKey='articles' className='tabs'>
      <AntdTabs.TabPane key='articles' tab={`All (${props.articles.length})`}>
        <Row gutter={[16, 16]}>
          {props.articles.map((article, i) =>
            <Col key={i} className='tabs-col'>
              <Card article={article} />
            </Col>
          )}
        </Row>
      </AntdTabs.TabPane>
      <AntdTabs.TabPane key='favorites' tab={`My favorites (${props.favorites.length})`}>
        <Row gutter={[16, 16]}>
          {props.favorites.map((article, i) =>
            <Col key={i} className='tabs-col'>
              <Card article={article} />
            </Col>
          )}
        </Row>
      </AntdTabs.TabPane>
    </AntdTabs>
  )
}
