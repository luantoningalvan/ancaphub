import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllArticles } from './articleActions'
import { fetchAllCategories } from '../components/categories/categoriesAction'
import isEmpty from 'is-empty'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import ArticleCard from './articleCard'
import BeforeIcon from '@material-ui/icons/NavigateBefore'
import NextIcon from '@material-ui/icons/NavigateNext'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  formControl: {
    minWidth: 200,
  },
}));

function ArticlesList(props) {
  const classes = useStyles();
  const { articles, page, pageSize, total } = props.articles
  const [clientCurrentPage, setCurrentPage] = React.useState(1)
  const [clientPageSize, setPageSize] = React.useState(12)
  const [categorySelected, selectCategory] = React.useState('')
  const [order, setOrder] = React.useState('asc')

  useEffect(() => props.fetchAllArticles(clientCurrentPage, clientPageSize, order, '', '', categorySelected), [clientCurrentPage, order, categorySelected]);
  useEffect(() => props.fetchAllCategories(), []);

  const checkHowManyItemsAreAlreadyLoaded = () => {
    return page <= parseInt(total / pageSize) ? page * pageSize : total
  }

  const beforePageButton = () => {
      return (
        <IconButton
          color="primary"
          aria-label="Próxima"
          component="span"
          size="small"
          disabled={ clientCurrentPage == 1 }
          onClick = { () => setCurrentPage(clientCurrentPage - 1) }
        >
          <BeforeIcon />
        </IconButton>
      )
  }

  const nextPageButton = () => {
      return (
        <IconButton
          color="primary"
          aria-label="Próxima"
          component="span"
          size="small"
          disabled = { checkHowManyItemsAreAlreadyLoaded() == total }
          onClick = { () => setCurrentPage(clientCurrentPage + 1) }
        >
          <NextIcon />
        </IconButton>
      )
  }

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Artigos</Typography>
      </Box>

      <Box mb={3}>
        <Paper style={{paddingRight: '10px', paddingLeft: '10px'}}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Filtrar por categoria</InputLabel>
                <Select
                  value={categorySelected}
                  onChange={(e) => selectCategory(e.target.value)}
                >
                <MenuItem value="*">
                  Todas
                </MenuItem>
                {!isEmpty(props.categories) && props.categories.allCategories.map( category => (
                  <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Ordem</InputLabel>
                <Select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                <MenuItem value="asc">Crescente</MenuItem>
                <MenuItem value="desc">Decrescente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <span style={{ marginRight: '10px' }}>{`Total de artigos: ${checkHowManyItemsAreAlreadyLoaded()} - ${total}`}</span>
              {beforePageButton()}
              {nextPageButton()}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Grid container spacing={2}>
      {!isEmpty(articles) ? articles.map((article, index) => (
        <ArticleCard article={article} key={index}/>
      )) :
        (
          <p>Nenhum artigo disponível.</p>
        )
      }
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ articles: state.articles.allArticles, categories: state.categories })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllArticles, fetchAllCategories }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
