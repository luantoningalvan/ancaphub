import React, { useEffect } from 'react'
import Template from '../../../template/template'
import Categories from '../../../components/categories/showElementCategories'
import ReactPlayer from 'react-player'
import isEmpty from 'is-empty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchItem } from '../itemActions'
import { Typography, Box, Grid } from '@material-ui/core';

function SingleVideo(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);

  const { title, author, categories, content, extraFields } = props.video.item;

  return (
    <Template>
      {!isEmpty(props.video.item) && props.video.item.type == "video" && (
        <>
          <Box mb={2}>
            <Typography variant="h4" component="h2">{title}</Typography>
            <Typography variant="subtitle1" component="p" gutterBottom>{author}</Typography>
          </Box>

          <Categories categories={categories} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ReactPlayer
                url={extraFields.videoUrl}
              />
              <Box mt={2}>
                <Typography variant="body1" component="p">{content}</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Template>

  )
}


const mapStateToProps = (state) => ({ video: state.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo)
