import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Grid
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import BookCard from '../../components/library/book/bookCard';
import ArticleCard from '../../components/library/article/articleCard';
import VideoCard from '../../components/library/video/videoCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserLibrary } from '../../actions/userActions';
import LoadContent from '../../components/loaders/loadContent'

function UserLibrary({getUserLibrary, library, user}) {
  useEffect(() => getUserLibrary(user._id), [user._id, getUserLibrary]);

  return (
    <>
      <Title title={`${user.username} - Coleção`} />

      <LoadContent loading={false}>
        <Grid container spacing={2}>
          {library && !isEmpty(library) ? (
            library.map(item => (
              <Grid item xs={12} sm={8} md={6} lg={4}  key={item._id}>
                {item.type === 'book' && <BookCard book={item} location="user-library"/>}

                {item.type === 'article' && <ArticleCard article={item} location="user-library"/>}

                {item.type === 'video' && <VideoCard video={item} location="user-library"/>}
              </Grid>
            ))
          ) : (
              <Grid item xs={12}>
                <Paper>
                  <Box p={2}>Esse usuário não possui nenhum item na coleção.</Box>
                </Paper>
              </Grid>
            )}
        </Grid>
      </LoadContent>
    </>
  );
}

const mapStateToProps = state => ({
  library: state.users.user.personalLibrary
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserLibrary }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLibrary);
