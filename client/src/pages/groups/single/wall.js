import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PostNewStatus from '../../../components/posts/postNewStatus';
import ShowPosts from '../../../components/posts/showPosts';
import { Box, Grid, Container } from '@material-ui/core';
import image from '../../../assets/images/1.jpg'

const useStyles = makeStyles(theme => ({
  groupCover: {
    borderRadius: 10,
    background: `url(${image})`,
    height: 250,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}))

export default props => {
  const classes = useStyles()
  return (
    <Container>
      <Box className={classes.groupCover} my={2}></Box>
      <Grid container justify="center">
        <Grid item xs={8}>
          <PostNewStatus />
          <ShowPosts posts={{}} />
        </Grid>
      </Grid>
    </Container>
  )
}