import React, { useEffect, Fragment } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty';
import parse from 'html-react-parser';
import defaultThumbnail from '../../../assets/images/default-thumbnail.jpg'
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Categories from '../../../components/categories/showElementCategories';
import LoadingItems from '../../../components/loaders/loadingItems'
import UnavaliableContent from '../../../components/error/unavaliableContent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItem } from '../../../actions/itemActions';

function SingleArticle(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);

  const { title, author, categories, content, cover } = props.article.item;

  const useStyles = makeStyles(theme => ({
    banner: {
      background: `url(${cover ? cover.url : defaultThumbnail}) rgba(0,0,0,0.8)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      backgroundBlendMode: 'overlay'
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
      {props.article.loading ? (
        <Box width="100%" height="100%" display="flex" alignContent="center" justifyContent="center">
          <LoadingItems />
        </Box>
      ) : (
          <Fragment>
            {!isEmpty(props.article.item) && props.article.item.type === 'article' ? (
              <Fragment>
                <Title title={`${title} - ${author}`} />
                <div className={classes.banner}>
                  <Box
                    pt={8}
                    py={12}
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                    <Categories categories={categories} />
                    <Typography
                      style={{ textAlign: 'center' }}
                      variant="h4"
                      component="h2"
                      className={classes.title}>
                      {title}
                    </Typography>
                    <Typography
                      style={{ textAlign: 'center' }}
                      variant="h6"
                      component="h3"
                      className={classes.author}>
                      {author}
                    </Typography>
                  </Box>
                </div>
                <Box mt={-3}>
                  <Container style={{ position: 'absolute', width: 'auto' }}>
                    <Box mb={4}>
                      <Paper>
                        <Box px={4} py={2}>
                          {parse(`${content}`)}
                        </Box>
                      </Paper>
                    </Box>
                  </Container>
                </Box>
              </Fragment>
            ) : (
                <Container>
                  <Box mt={2}>
                    <UnavaliableContent />
                  </Box>
                </Container>
              )}
          </Fragment>
        )}
    </Template>
  );
}

const mapStateToProps = state => ({ article: state.items });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticle);
