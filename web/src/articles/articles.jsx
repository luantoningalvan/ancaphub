import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllArticles } from './articleActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import ArticleCard from './articleCard'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function ArticlesList(props) {
  useEffect(() => props.fetchAllArticles(), []);
  const classes = useStyles();

  return (
    <Template>
      <Box mb={2}>
        <Typography variant="h4" component="h2">Artigos</Typography>
      </Box>

      <Grid container spacing={2}>
      {props.articles.map((article, index) => (
        <ArticleCard article={article} key={index}/>
      ))}
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ articles: state.articles.allArticles })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllArticles }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
