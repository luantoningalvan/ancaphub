import React from 'react'
import Template from '../../../template/template'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import VideoCard from './videoCard'
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom'
import Filter from '../filter'

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
        type="video"
      />

      <Grid container spacing={2}>
        {!isEmpty(videos.allItems.items) ? videos.allItems.items.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <VideoCard video={video} user={props.user} />
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

const mapStateToProps = (state) => ({ videos: state.items, user: state.auth.user })
export default connect(mapStateToProps)(VideosList)
