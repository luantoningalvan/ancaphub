import React, { useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../../../template/template'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
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

  const useStyles = makeStyles(theme => ({
    banner: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: `url(${cover}) rgba(0,0,0,0.5)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: "100%",
      height: "300px",
    },
    bannelOverlay: {
      width: '100%',
      height: '100%',
      background: 'black',
      opacity: 0.8
    },
    title: {
      fontWeight: 'bold',
      color: 'white'
    },
    author: {
      fontWeight: 'light',
      color: 'white'
    }
  }));

  const classes = useStyles();

  return (
    <Template noPadding>
      {!isEmpty(props.article.item) && props.article.item.type == "article" && (
        <Fragment>
          <div className={classes.banner}>
            <div className={classes.bannelOverlay}></div>
          </div>
          <Box mt={8}>
            <Container style={{ position: 'absolute', width: 'auto' }}>
              <Box mb={8} display="flex" flexDirection="column" alignItems="center">
                <Categories categories={categories} />
                <Typography style={{ textAlign: "center" }} variant="h4" component="h2" className={classes.title}>{title}</Typography>
                <Typography style={{ textAlign: "center" }} variant="h6" component="h3" className={classes.author}>{author}</Typography>
              </Box>
              <Box mb={3}>
                <Paper>
                  <Box px={4} py={2}>
                    {parse(`${content}`)}
                  </Box>
                </Paper>
              </Box>
            </Container>
          </Box>
        </Fragment>
      )}

    </Template>

  )
}


const mapStateToProps = (state) => ({ article: state.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
