import React, { useState, ChangeEvent } from 'react'
import { Col, Row, Tabs as AntdTabs } from 'antd'

import { ArticleType } from '../../../store/types/articles/articles'
import { Card, SearchBar } from '../'
import './Tabs.scss'

type Props = {
  articles: Array<ArticleType>
  favorites: Array<ArticleType>
}

export default function Tabs (props: Props) {
  const [search, setSearch] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

  const filteredArticles = search ? props.articles.filter(article => article.title.toLowerCase().includes(search.toLowerCase())) : props.articles

  const filteredFavorites = search ? props.favorites.filter(article => article.title.toLowerCase().includes(search.toLowerCase())) : props.favorites

  return (
    <AntdTabs defaultActiveKey='articles' tabBarExtraContent={<SearchBar onChangeCallback={onChange} />} className='tabs'>
      <AntdTabs.TabPane key='articles' tab={`All (${filteredArticles.length})`}>
        <Row gutter={[16, 16]}>
          {filteredArticles.map((article, i) =>
            <Col key={i} className='tabs-col'>
              <Card article={article} />
            </Col>
          )}
        </Row>
      </AntdTabs.TabPane>
      <AntdTabs.TabPane key='favorites' tab={`My favorites (${filteredFavorites.length})`}>
        <Row gutter={[16, 16]}>
          {filteredFavorites.map((article, i) =>
            <Col key={i} className='tabs-col'>
              <Card article={article} />
            </Col>
          )}
        </Row>
      </AntdTabs.TabPane>
    </AntdTabs>
  )
}
