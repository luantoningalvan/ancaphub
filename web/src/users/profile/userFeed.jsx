import React, { useEffect } from 'react'
import PostNewStatus from '../../components/posts/postNewStatus'
import ShowPosts from '../../components/posts/showPosts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadUserPosts } from "../../components/posts/postActions"

function UserFeed(props) {
  useEffect(() => props.loadUserPosts(props.user._id), [props.user._id])

  return (
    <React.Fragment>
      {props.isUserLoggedProfile && <PostNewStatus user={props.user} />}
      <ShowPosts posts={props.posts} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({ posts: state.posts.posts })
const mapDispatchToProps = (dispatch) => bindActionCreators({ loadUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserFeed)
