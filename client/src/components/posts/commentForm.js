import React, {useState} from 'react'
import {
  InputBase,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import ProfilePicture from '../profile/profilePicture';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addComment } from '../../actions/postActions'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: 8
  },
  commentForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding:16
  },
  commentInput: {
    padding: "2px 15px", 
    borderRadius: 20, 
    background: 'transparent',
    border: "1px solid rgba(0,0,0,0.1)", 
    flexGrow: 1
  },
}))

const CommentForm = ({ auth, post, addComment }) => {
  const classes = useStyles()
  const [commentData, setCommentData] = useState({ content: ""})

  const handleChange = (e) => {
    setCommentData({ content: e.target.value})
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      if(commentData.content !== ""){
        addComment(post, commentData)
        setCommentData({ content: ""})
      }
    }
  }

  return (
      <div className={classes.commentForm}>
        <ProfilePicture avatar={auth.user.avatar} height="35" width="35" className={classes.avatar} />
        <InputBase
          size="small"
          variant="filled"
          placeholder="Faça um comentário"
          color="secondary"
          className={classes.commentInput}
          onKeyPress={handleKeyPress}
          value={commentData.content}
          onChange={handleChange}
        />
      </div>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ addComment }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)