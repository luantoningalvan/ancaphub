import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PostNewStatus from '../../../components/posts/postNewStatus';
import ShowPosts from '../../../components/posts/showPosts';
import { Box, Grid, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  groupCover: {
    borderRadius: 10,
    background: "rgba(0,0,0,0.1)",
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}))

export default props => {
  const classes = useStyles()
  return (
    <Box mt={10}>
      <Container>
        <div className={classes.groupCover}>
          <button style={{color: 'inherit', textDecoration: 'none'}}>Selecionar capa</button>
        </div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <PostNewStatus />
            <ShowPosts posts={{}} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}