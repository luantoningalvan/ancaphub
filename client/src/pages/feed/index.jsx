import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Button,
  Hidden
} from '@material-ui/core';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import Sidebar from '../../components/template/sidebar'
import ShowPosts from '../../components/posts/showPosts';
import LoadingItems from '../../components/loaders/loadingItems'
import LoadContent from '../../components/loaders/loadContent'
import PostNewStatus from '../../components/posts/postNewStatus'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserFeed } from '../../actions/postActions';

function Feed({auth, loadUserFeed, posts,}) {
const {loading: authLoading, isAuthenticated} = auth

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        loadUserFeed();
      }
    }
  }, [isAuthenticated, authLoading, loadUserFeed]);

  const [currentPage, setCurrentPage] = useState(1)

  const loadMorePosts = () => {
    setCurrentPage(currentPage => currentPage + 1)
    loadUserFeed({ currentPage: currentPage + 1 });
  }

  return (
    <Container>
      <Box mt={2}>
      <Title />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <LoadContent loading={posts.loading && currentPage === 1}>
            <Box>
              <PostNewStatus />
              <ShowPosts posts={posts.posts} />
              <Box width="100%">

                {posts.loading && currentPage !== 1 ? (
                  <LoadingItems />
                ) : (
                    <Button fullWidth onClick={loadMorePosts}>Carregar mais postagens</Button>
                  )}
              </Box>
            </Box>
          </LoadContent>
        </Grid>

        <Grid item sm={4}>
          <Hidden xsDown implementation="css">
            <Sidebar />
          </Hidden>
        </Grid>
      </Grid>
      </Box>
    </Container>
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
