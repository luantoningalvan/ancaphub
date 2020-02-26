import React, { useEffect } from 'react'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadSinglePost } from '../../actions/postActions';

import LikeItem from './likeItem'

const useStyles = makeStyles(theme => ({
  list: {
   padding: 20,
   width: '30rem'
  }
}))


function ShowLikes({ open, postId, closeFunc, post, loadSinglePost }){

  const classes = useStyles()

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
          <div className={classes.list}>
            {post.post.likes.map((like) =>(
              <LikeItem data={like} key={like._id}/> 
            ))}
          </div>
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