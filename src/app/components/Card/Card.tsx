import React from 'react'
import { Avatar, Card as AntdCard } from 'antd'
import moment from 'moment'

import { ArticleType } from '../../../store/types/articles/articles'
import './Card.scss'

type Props = {
  article: ArticleType
}

export default function Card (props: Props) {
  const { article: { title, description, created_at, url, image, website } } = props

  const descriptionPreview = description ? description.length > 200 ? `${description.substr(0, 200)}...` : description : 'No description provided'

  return (
    <AntdCard className='card'>
      <div className='card-header'>
        <Avatar size='large' src={image} />
        <h3 className='card-header-title'>
          <a href={url} className='card-header-title-link' target='_blank' rel='noopener noreferrer'>{title}</a>
        </h3>
      </div>
      <p className='card-content'>{descriptionPreview}</p>
      <div className='card-footer'>
        <span>{moment(created_at).format('YYYY-MM-DD')}</span>
        <span>{website.name}</span>
      </div>
    </AntdCard>
  )
}
