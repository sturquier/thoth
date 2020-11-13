import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Card as AntdCard } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import moment from 'moment'

import { RootState } from '../../../store/reducers'
import { createFavoriteRequest, removeFavoriteRequest } from '../../../store/actions/favorites/favorites'
import { ArticleType } from '../../../store/types/articles/articles'
import { Loader } from '..'
import './Card.scss'

type Props = {
  article: ArticleType
  favorites: Array<ArticleType>
  pendingFavoriteId: number
  onCreateFavorite: (payload: { article: number }) => void
  onRemoveFavorite: (payload: { article: number }) => void
}

export function Card (props: Props) {
  const { article: { id, title, description, createdAt, url, website }, favorites, pendingFavoriteId } = props

  const descriptionPreview = description ? description.length > 100 ? `${description.substr(0, 100)}...` : description : 'No description provided'

  return (
    <AntdCard className={`card ${id === pendingFavoriteId ? 'card-pending' : ''}`}>
      {id === pendingFavoriteId && <Loader className='loader-wrapper-card' />}
      <div className='card-header'>
        <h3 className='card-header-title'>
          <a href={url} className='card-header-title-link' target='_blank' rel='noopener noreferrer'>{title}</a>
        </h3>
        {favorites.find(favorite => favorite.id === id) ? (
          <HeartFilled onClick={() => props.onRemoveFavorite({ article: id })} className='card-header-heartFilled' />
        ) : (
          <HeartOutlined onClick={() => props.onCreateFavorite({ article: id })} className='card-header-heartOutlined' />
        )}
      </div>
      <p className='card-content'>{descriptionPreview}</p>
      <div className='card-footer'>
        <span>{moment(createdAt).format('YYYY-MM-DD')}</span>
        <span>{website.name}</span>
      </div>
    </AntdCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  favorites: state.favorites.favorites,
  pendingFavoriteId: state.favorites.pendingFavoriteId
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCreateFavorite: (payload: { article: number }) => dispatch(createFavoriteRequest(payload)),
  onRemoveFavorite: (payload: { article: number }) => dispatch(removeFavoriteRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
