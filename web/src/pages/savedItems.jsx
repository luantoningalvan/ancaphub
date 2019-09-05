import React, { useEffect } from 'react';
import Template from '../template/template';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BookCard from './collection/books/bookCard';
import ArticleCard from './collection/articles/articleCard';
import VideoCard from './collection/videos/videoCard';
import isEmpty from 'is-empty';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSaved } from './collection/itemActions';

const SavedItems = props => {
  useEffect(() => props.getSaved(), []);

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Salvos
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {props.saved && !isEmpty(props.saved) ? (
          props.saved.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {item.type == 'book' && <BookCard book={item} />}

              {item.type == 'article' && <ArticleCard article={item} />}

              {item.type == 'video' && <VideoCard video={item} />}
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
    </Template>
  );
};

const mapStateToProps = state => ({ saved: state.auth.saved });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSaved }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedItems);
