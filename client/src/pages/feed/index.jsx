import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Grid,
  Hidden
} from '@material-ui/core';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import Sidebar from '../../components/template/sidebar'
import ShowPosts from '../../components/posts/showPosts';
import LoadingItems from '../../components/loaders/loadingItems'
import PostNewStatus from '../../components/posts/postNewStatus'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserFeed } from '../../actions/postActions';

function Feed(props) {
  useEffect(() => {
    if (!props.auth.loading) {
      if (props.auth.isAuthenticated) {
        props.loadUserFeed();
      }
    }
  }, [props.auth.isAuthenticated, props.auth.loading]);

  return (
    <Template>
      <Title />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          {props.posts.loading ? (
            <LoadingItems />
          ) : (
              <Box>
                <PostNewStatus />
                <ShowPosts posts={props.posts.posts} loading={props.posts.loading} />
              </Box>
            )}
        </Grid>

        <Grid item sm={4}>
          <Hidden xsDown implementation="css">
            <Sidebar />
          </Hidden>
        </Grid>
      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadUserFeed }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
