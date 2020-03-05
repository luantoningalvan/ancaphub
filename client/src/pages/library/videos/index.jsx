import React, { useEffect } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Container
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Title from '../../../components/template/titleComponent'
import VideoCard from '../../../components/library/video/videoCard';
import LoadContent from '../../../components/loaders/loadContent'
import ShowCategories from '../../../components/categories/showElementCategories'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../../actions/itemActions';
import { fetchAllCategories } from '../../../actions/categoryAction';
import styled from 'styled-components';

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 30px 20px;
`

function Videos({fetchAllItems, fetchAllCategories, videos, categories}) {
  useEffect(() => {
    fetchAllItems({type: "video"})
    fetchAllCategories()
  }, [fetchAllItems, fetchAllCategories])


  return (
    <>
      <Title title="Vídeos" />
      <Box pt={2} pb={5} style={{background: "rgba(0, 0, 0, 0.05)"}}>
        <Container>
          <Box mb={3} display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h2">
            Vídeos
            </Typography>
              <Button
                component={Link}
                to="/contribute/video"
                variant="contained"
                disableElevation
                size="small"
                color="secondary">
                <AddIcon />
              </Button>
          </Box>
          <Box mb={3} display="flex" justifyContent="center">

          <LoadContent loading={categories.loading}>
           <ShowCategories categories={categories.allCategories} />
          </LoadContent>
          </Box>
        </Container>
      </Box>


      <Container style={{marginTop: -28}}>
        <LoadContent loading={videos.loading}>
          {!isEmpty(videos.allItems.items) ? (
            <Grid>
              {videos.allItems.items.map((video, index) => (
                <>
                  <VideoCard video={video} key={index} />
                  </>
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
      </Container>
    </>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchAllItems, fetchAllCategories}, dispatch)
const mapStateToProps = state => ({
  videos: state.items,
  categories: state.categories
});
export default connect(mapStateToProps, mapDispatchToProps)(Videos);
