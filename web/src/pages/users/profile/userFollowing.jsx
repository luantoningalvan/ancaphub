import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import isEmpty from 'is-empty'
import UserCard from '../userCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserFollowing } from "../userActions"

function UserFollowing(props) {
  useEffect(() => props.getUserFollowing(props.user._id), [props.user._id])

  return (
    <Grid container spacing={2}>
      {props.following && !isEmpty(props.following) ? props.following.map(user => (
        <Grid item xs={3} key={`following-${user._id}`}>
          <UserCard user={user} />
        </Grid>
      )) : (
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                Esse usuário não segue ninguém.
                </Box>
            </Paper>
          </Grid>

        )}
    </Grid>

  );
}

const mapStateToProps = (state) => ({ following: state.users.user.following })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserFollowing }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowing)
