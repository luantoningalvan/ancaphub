import React, { useEffect } from 'react'
import Template from '../../template/template';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ShowPosts from '../../components/posts/showPosts'
import Grid from '@material-ui/core/Grid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadUserFeed } from "../../components/posts/postActions"

function Home(props) {
  useEffect(() => props.loadUserFeed(), [])

  return (
    <Template>
      <Box mb={2}>
        <Typography variant="h4" component="h2">Home</Typography>
      </Box>
      <Grid container>
        <Grid item xs={8}>
          <ShowPosts posts={props.posts} />
        </Grid>
      </Grid>
    </Template>
  );
}

const mapStateToProps = (state) => ({ posts: state.posts.posts })
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadUserFeed }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

