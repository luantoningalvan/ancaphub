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
import { getUserCollection } from '../../actions/userActions';
import LoadContent from '../../components/loaders/loadContent'

function UserCollection(props) {
  useEffect(() => props.getUserCollection(props.user._id), [props.user._id]);

  return (
    <>
      <Title title={`${props.user.username} - Coleção`} />

      <LoadContent loading={false}>
        <Grid container spacing={2}>
          {props.collection && !isEmpty(props.collection) ? (
            props.collection.map(item => (
              <Grid item xs={12} sm={8} md={6} lg={4}>
                {item.type === 'book' && <BookCard book={item} />}

                {item.type === 'article' && <ArticleCard article={item} />}

                {item.type === 'video' && <VideoCard video={item} />}
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
  collection: state.users.user.personalCollection
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserCollection }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCollection);
