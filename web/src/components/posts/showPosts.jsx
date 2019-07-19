import React, { useEffect } from 'react'
import PostCard from './postCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadUserPosts, deletePost } from './postActions'

function ShowPosts(props) {
  useEffect(() => props.loadUserPosts(props.user._id), [props.user])
  return (
    <React.Fragment>
      {props.posts != [] && props.posts.map(post => (
        <PostCard post={post} key={post._id} deleteAction={props.deletePost} />
      ))}
    </React.Fragment>

  )
}
const mapStateToProps = (state) => ({ posts: state.posts.posts })
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadUserPosts, deletePost }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts)