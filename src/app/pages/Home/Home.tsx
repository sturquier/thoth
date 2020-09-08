import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RootState } from '../../../store/reducers'
import { ArticleType } from '../../../store/types/articles/articles'
import { FavoriteType } from '../../../store/types/favorites/favorites'
import { fetchArticlesRequest } from '../../../store/actions/articles/articles'
import { fetchFavoritesRequest } from '../../../store/actions/favorites/favorites'
import { WithAuthentication } from '../../hoc'
import { Loader, Page, Tabs } from '../../components'

type Props = {
  loadingArticles: boolean
  loadingFavorites: boolean
  articles: Array<ArticleType>
  favorites: Array<FavoriteType>
  onFetchArticles: () => void
  onFetchFavorites: () => void
}

export function Home (props: Props) {
  useEffect(() => {
    props.onFetchArticles()
    props.onFetchFavorites()
  }, [])

  return (
    <Page>
      {props.loading && <Loader />}
      <h1>Home</h1>
      <Tabs articles={props.articles} favorites={props.favorites} />
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loadingArticles: state.articles.loading,
  articles: state.articles.articles,
  loadingFavorites: state.favorites.loading,
  favorites: state.favorites.favorites
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchArticles: () => dispatch(fetchArticlesRequest()),
  onFetchFavorites: () => dispatch(fetchFavoritesRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithAuthentication(Home))
