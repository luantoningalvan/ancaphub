import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import BookCard from '../../components/library/book/bookCard';
import ArticleCard from '../../components/library/article/articleCard';
import VideoCard from '../../components/library/video/videoCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBookmarks } from '../../actions/bookmarkActions';
import LoadContent from '../../components/loaders/loadContent'

const Bookmarks = ({bookmarks, getBookmarks}) => {
  useEffect(() => getBookmarks(), [getBookmarks]);

  return (
    <>
      <Title title="Itens Salvos" />
      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Salvos
        </Typography>
      </Box>

      <LoadContent loading={bookmarks.loading}>
      <Grid container spacing={2}>
        {bookmarks.allItems && !isEmpty(bookmarks.allItems) ? (
          bookmarks.allItems.items.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              {item.type === 'book' && <BookCard book={item} />}

              {item.type === 'article' && <ArticleCard article={item} />}

              {item.type === 'video' && <VideoCard video={item} />}
            </Grid>
          ))
        ) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>Você não possui nenhum item salvo.</Box>
              </Paper>
            </Grid>
          )}
      </Grid>
      </LoadContent>
    </>
  );
};

const mapStateToProps = state => ({ bookmarks: state.items });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBookmarks }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookmarks);
