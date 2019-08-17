import React from 'react'
import Template from '../../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllVideos, selectCategory, selectOrder, selectPage } from './videoActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import VideoCard from './videoCard'
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom'
import Filter from '../../components/filter/filter'

function VideosList(props) {
  const { videos } = props
  return (
    <Template>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">Vídeos</Typography>
        <Button component={Link} to={`videos/contribuir`} variant="contained" color="primary">
          <AddIcon style={{ marginRight: '10px' }} />
          Contribuir
          </Button>
      </Box>

      <Filter
        fetchAction={props.fetchAllVideos}
        filters={videos.filters}
        selectCategory={props.selectCategory}
        selectOrder={props.selectOrder}
        selectPage={props.selectPage}
        totalItens={videos.allVideos.total}
        pageSize={videos.allVideos.pageSize}
      />

      <Grid container spacing={2}>
        {!isEmpty(videos.allVideos.items) ? videos.allVideos.items.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <VideoCard video={video} user={props.user} key={index} />
          </Grid>
        )) :
          (
            <p>Nenhum vídeo disponível.</p>
          )
        }
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ videos: state.videos, user: state.auth.user })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllVideos, selectCategory, selectOrder, selectPage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VideosList)
