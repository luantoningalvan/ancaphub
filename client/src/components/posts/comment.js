import React from 'react'
import {
  Link,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core'
import ProfilePicture from '../profile/profilePicture';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import ptBr from 'moment/locale/pt-br'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  avatar: {
    marginRight: 8
  },
  commentContent: {
    background: 'rgba(0,0,0,0.05)',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  userName: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
  commentText:{
    padding:0, 
    margin:0,
    textAlign: 'left'
  },
  date: {fontSize: 13, color: theme.palette.text.secondary, marginTop:5}
}))

const Comment = ({ comment }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ProfilePicture avatar={comment.user.avatar} height="35" width="35" className={classes.avatar} />
      <div className={classes.commentContent}>
        <p className={classes.commentText}>
          <Link to={`/${comment.user._id}`} className={classes.userName}>{comment.user.name}</Link> 
          {" " + comment.content}
        </p>
        <span className={classes.date}>{moment(comment.date).tz('America/Sao_Paulo').locale('pt-br', ptBr).startOf(comment.date).fromNow()}</span>
      </div>
    </div>
  )
}

export default Comment