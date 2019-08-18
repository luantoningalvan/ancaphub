import React from 'react'
import Template from '../../template/template'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ArticleCard from './articleCard'
import isEmpty from 'is-empty'
import Filter from '../../components/filter/filter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllArticles, selectCategory, selectOrder, selectPage } from './articleActions'
import { Link } from 'react-router-dom'

function ArticlesList(props) {
  const { articles } = props
  return (
    <Template>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">Artigos</Typography>
        <Button component={Link} to={`artigos/contribuir`} variant="contained" color="primary">
          <AddIcon style={{ marginRight: '10px' }} />
          Contribuir
          </Button>
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
