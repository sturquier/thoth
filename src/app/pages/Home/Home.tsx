import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { RootState } from '../../../store/reducers'
import { ArticleType } from '../../../store/types/articles/articles'
import { fetchArticlesRequest } from '../../../store/actions/articles/articles'
import { Page } from '../../components'

type Props = {
  loading: boolean
  articles: Array<ArticleType>
  onFetchArticles: () => void
}

export function Home (props: Props) {
  useEffect(() => {
    props.onFetchArticles()
  }, [])

  return (
    <Page>
      <h1>Home</h1>
    </Page>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.articles.loading,
  articles: state.articles.articles
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchArticles: () => dispatch(fetchArticlesRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
