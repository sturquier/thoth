import React, { useEffect, Fragment } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RootState } from '../../../store/reducers'
import { ArticleType } from '../../../store/types/articles/articles'
import { fetchArticlesRequest } from '../../../store/actions/articles/articles'
import { fetchFavoritesRequest } from '../../../store/actions/favorites/favorites'
import { WithAuthentication } from '../../hoc'
import { Loader, Page, Pagination, Tabs } from '../../components'

type Props = {
  loadingArticles: boolean
  loadingFavorites: boolean
  articles: Array<ArticleType>
  favorites: Array<ArticleType>
  onFetchArticles: () => void
  onFetchFavorites: () => void
}

export function Home (props: Props) {
  useEffect(() => {
    if (!props.articles.length) {
      props.onFetchArticles()
      props.onFetchFavorites()
    }
  }, [])

  return (
    <Page>
      <h1>Articles</h1>
      {(props.loadingArticles || props.loadingFavorites) ? (
        <Loader />
      ) : (
        <Fragment>
          <Tabs articles={props.articles} favorites={props.favorites} />
          <Pagination />
        </Fragment>
      )}
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
