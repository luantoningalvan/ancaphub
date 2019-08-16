import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../../template/template'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchArticle } from './articleActions'
import { Typography, Box, Grid } from '@material-ui/core'
import parse from 'html-react-parser'
import Categories from '../../components/categories/showElementCategories'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function SingleArticle(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchArticle(id), []);
  const classes = useStyles();
  const { _id, title, author, categories, content, cover } = props.article;

  return (
    <Template>
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
    </Template>

  )
}


const mapStateToProps = (state) => ({ article: state.articles.article })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchArticle }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
