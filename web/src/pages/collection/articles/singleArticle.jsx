import React, { useEffect } from 'react'
import Template from '../../../template/template'
import Categories from '../../../components/categories/showElementCategories'
import isEmpty from 'is-empty'
import parse from 'html-react-parser'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchItem } from '../itemActions'
import { Typography, Box, Grid } from '@material-ui/core'

function SingleArticle(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);
  const { title, author, categories, content, cover } = props.article.item;

  return (
    <Template>
      {!isEmpty(props.article.item) && props.article.item.type == "article" && (
        <>
          <Box>
            <img src={cover} alt={`Capa do livro ${title}`} />
          </Box>

          <Box my={2}>
            <Typography variant="h4" component="h2" gutterBottom>{title} - {author}</Typography>
          </Box>

          <Categories categories={categories} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {parse(`${content}`)}
            </Grid>
          </Grid>
        </>
      )}
    </Template>

  )
}


const mapStateToProps = (state) => ({ article: state.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
