import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Link as MaterialLink,
  Hidden
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import deafaultCover from '../../assets/images/default-thumbnail.jpg'
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import ShowPosts from '../../components/posts/showPosts';
import LoadingItems from '../../components/loaders/loadingItems'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserFeed, loadAllPublicPosts } from '../../actions/postActions';
import { fetchAllItems } from '../../actions/itemActions';

function Home(props) {
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const types = {
    book: 'livro',
    article: 'artigo',
    video: 'video',
    podcast: 'podcast'
  };

  useEffect(() => {
    if (!props.auth.loading) {
      if (props.auth.isAuthenticated) {
        props.loadUserFeed();
      } else {
        props.loadAllPublicPosts()
      }
    }
  }, [props.auth.isAuthenticated, props.auth.loading]);

  useEffect(() => {
    props.fetchAllItems({ pageSize: 5 });
  }, [])

  return (
    <Template>
      <Title />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          {props.auth.loading || props.posts.loading ? (
            <LoadingItems />
          ) : (
              <Fragment>
                {props.auth.isAuthenticated ? (
                  <ShowPosts posts={props.posts.posts} loading={props.posts.loading} />
                ) : (
                    <Box p={2}>
                      <Typography variant="body1" gutterBottom>Exibindo postagens públicas. Faça login para ver seu feed personalizado.</Typography>
                      <ShowPosts posts={props.posts.posts} loading={props.posts.loading} />
                    </Box>
                  )}
              </Fragment>
            )}


        </Grid>

        <Grid item sm={4}>
          <Hidden xsDown implementation="css">
            <Box mb={0.5}>
              <Typography variant="h6" component="h2">
                Últimas contribuições
            </Typography>
            </Box>
            {props.items.loading ? (
              <Box pt={2}>
                <LoadingItems />
              </Box>
            ) : (
                <List disablePadding>
                  {props.items.allItems.items &&
                    props.items.allItems.items.map(item => (
                      <ListItem alignItems="flex-start" disableGutters key={item._id}>
                        <ListItemAvatar
                          style={{
                            height: '60px',
                            width: '40px',
                            background: `url(${item.cover ? item.cover.url : deafaultCover})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginRight: '10px'
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              noWrap>
                              <MaterialLink
                                color="textPrimary"
                                component={AdapterLink}
                                to={`/${types[item.type]}s/${types[item.type]}/${
                                  item._id
                                  }`}>
                                {item.title}
                              </MaterialLink>
                            </Typography>
                          }
                          secondary={item.author}
                        />
                      </ListItem>
                    ))}
                </List>
              )}
          </Hidden>
        </Grid>

      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  items: state.items
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadUserFeed, loadAllPublicPosts, fetchAllItems }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
