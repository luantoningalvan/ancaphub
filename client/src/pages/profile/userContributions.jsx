import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Grid
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import BookCard from '../../components/collection/book/bookCard';
import ArticleCard from '../../components/collection/article/articleCard';
import VideoCard from '../../components/collection/video/videoCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserContributions } from '../../actions/userActions';
import LoadContent from '../../components/loaders/loadContent'

function UserContributions({getUserContributions, contributions, user}) {
  useEffect(() => getUserContributions(user._id), [user._id, getUserContributions]);

  return (
    <>
      <Title title={`${user.username} - Contribuições`} />
      <LoadContent loading={false}>
      <Grid container spacing={2}>
        {contributions && !isEmpty(contributions) ? (
          contributions.map(item => (
            <Grid item xs={12} sm={8} md={6} lg={4} key={item._id}>
              {item.type === 'book' && <BookCard book={item} />}

              {item.type === 'article' && <ArticleCard article={item} />}

              {item.type === 'video' && <VideoCard video={item} />}
            </Grid>
          ))
        ) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>Esse usuário não colaborou com nenhum item.</Box>
              </Paper>
            </Grid>
          )}
      </Grid>
      </LoadContent>
    </>
  );
}

const mapStateToProps = state => ({
  contributions: state.users.user.contributions
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserContributions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContributions);
