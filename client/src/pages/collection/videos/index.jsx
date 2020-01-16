import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import isEmpty from 'is-empty';
import { Link } from 'react-router-dom';
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Filter from '../../../components/collection/filter';
import VideoCard from '../../../components/collection/video/videoCard';
import LoadContent from '../../../components/loaders/loadContent'
import { connect } from 'react-redux';

function Videos(props) {
  const { videos } = props;

  return (
    <Template>
      <Box display="flex" flexDirection="column" height="100%">
        <Title title="Vídeos" />
        <Box mb={3} display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            Vídeos
          </Typography>
          <Button
            component={Link}
            to="/contribute/video"
            variant="outlined"
            color="secondary">
            <AddIcon style={{ marginRight: '10px' }} />
            Contribuir
          </Button>
        </Box>

        <Filter type="video" />

        <LoadContent loading={videos.loading}>
          {!isEmpty(videos.allItems.items) ? (
            <Grid container spacing={2}>
              {videos.allItems.items.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <VideoCard video={video} user={props.user} />
                </Grid>
              ))}
            </Grid>
          ) : (
              <Paper>
                <Box p={2}>
                  Nenhum vídeo encontrado.
              </Box>
              </Paper>
            )}
        </LoadContent>
      </Box>
    </Template>
  );
}

const mapStateToProps = state => ({
  videos: state.items,
  user: state.auth.user
});
export default connect(mapStateToProps)(Videos);
