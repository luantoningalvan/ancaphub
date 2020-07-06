import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BookCard from '../../collection/books/bookCard';
import ArticleCard from '../../collection/articles/articleCard';
import VideoCard from '../../collection/videos/videoCard';
import isEmpty from 'is-empty';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserContributions } from '../userActions';

function UserContributions(props) {
  useEffect(() => props.getUserContributions(props.user._id), [props.user._id]);

  return (
    <Grid container spacing={2}>
      {props.contributions && !isEmpty(props.contributions) ? (
        props.contributions.map(item => (
          <Grid item xs={12} sm={8} md={6} lg={4}>
            {item.type == 'book' && <BookCard book={item} />}

            {item.type == 'article' && <ArticleCard article={item} />}

            {item.type == 'video' && <VideoCard video={item} />}
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
