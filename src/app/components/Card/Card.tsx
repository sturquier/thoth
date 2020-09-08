import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Card as AntdCard } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import moment from 'moment'

import { RootState } from '../../../store/reducers'
import { ArticleType } from '../../../store/types/articles/articles'
import { FavoriteType } from '../../../store/types/favorites/favorites'
import './Card.scss'

type Props = {
  article: ArticleType
  favorites: Array<FavoriteType>
}

export function Card (props: Props) {
  const { article: { id, title, description, created_at, url, image, website }, favorites } = props

  const descriptionPreview = description ? description.length > 200 ? `${description.substr(0, 200)}...` : description : 'No description provided'

  return (
    <AntdCard className='card'>
      <div className='card-header'>
        <Avatar size='large' src={image} />
        <h3 className='card-header-title'>
          <a href={url} className='card-header-title-link' target='_blank' rel='noopener noreferrer'>{title}</a>
        </h3>
        {favorites.find(favorite => favorite.id === id) ? <HeartFilled /> : <HeartOutlined />}
      </div>
      <p className='card-content'>{descriptionPreview}</p>
      <div className='card-footer'>
        <span>{moment(created_at).format('YYYY-MM-DD')}</span>
        <span>{website.name}</span>
      </div>
    </AntdCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  favorites: state.favorites.favorites
})

export default connect(mapStateToProps)(Card)
