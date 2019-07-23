import React, { useEffect } from 'react'
import PostCard from './postCard'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadUserPosts } from './postActions'
import isEmpty from 'is-empty'

function ShowPosts(props) {
  useEffect(() => props.loadUserPosts(props.user._id), [props.user._id])
  return (
    <React.Fragment>
      {!isEmpty(props.posts) ? props.posts.map(post => (
        <PostCard post={post} key={post._id} />
      )) : (
          <Paper>
            <Box p={2}>
              Esse usuário não fez nenhuma postagem.
            </Box>
          </Paper>
        )}
    </React.Fragment>

  )
}
const mapStateToProps = (state) => ({ posts: state.posts.posts })
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts)