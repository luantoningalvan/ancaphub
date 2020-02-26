import React, { useEffect } from 'react'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { Dialog } from '@material-ui/core'

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadSinglePost } from '../../actions/postActions';

import LikeItem from './likeItem'

function ShowLikes({ open, postId, closeFunc, post, loadSinglePost }){
  useEffect(() => {
    if(open) {
      loadPost()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const loadPost = () =>{
    loadSinglePost(postId)
  }

  console.log(post)

  return (
    <>
      { open && !post.loadingLike && post.post ? (
        <Dialog open={open} onClose={closeFunc}>
          {post.post.likes.map((like) =>(
            <LikeItem data={like} key={like._id}/> 
          ))}
        </Dialog>
      ) : <></>}
    </>
  )
}

const mapStateToProps = state => ({ post: state.posts });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadSinglePost }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowLikes);