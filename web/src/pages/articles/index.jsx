import React from 'react'
import Template from '../../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllArticles, selectCategory, selectOrder, selectPage } from './articleActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import ArticleCard from './articleCard'
import isEmpty from 'is-empty'
import Filter from '../../components/filter/filter'

function ArticlesList(props) {
  const { articles } = props
  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Artigos</Typography>
      </Box>

      <Filter
        fetchAction={props.fetchAllArticles}
        filters={articles.filters}
        selectCategory={props.selectCategory}
        selectOrder={props.selectOrder}
        selectPage={props.selectPage}
        totalItens={articles.allArticles.total}
        pageSize={articles.allArticles.pageSize}
      />

      <Grid container spacing={2}>
        {!isEmpty(articles.allArticles.items) ? articles.allArticles.items.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ArticleCard article={article} user={props.user} key={index} />
          </Grid>
        )) :
          (
            <p>Nenhum artigo disponível.</p>
          )
        }
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ articles: state.articles, user: state.auth.user })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllArticles, selectCategory, selectOrder, selectPage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
