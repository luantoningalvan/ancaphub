import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProfilePicture from '../../../components/profilePicture'
import MaterialLink from '@material-ui/core/Link';
import isEmpty from 'is-empty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserFollowers } from "../userActions"
import { Link } from 'react-router-dom'

function UserFollowers(props) {
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  useEffect(() => props.getUserFollowers(props.user._id), [props.user._id])

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5" component="h2">Seguidores</Typography>
      </Box>

      <Grid container spacing={2}>
        {props.followers && !isEmpty(props.followers) ? props.followers.map(user => (
          <Grid item xs={3} key={`follower-${user._id}`}>
            <MaterialLink underline="none" component={AdapterLink} to={`/usuario/${user._id}`}>
              <Paper>
                <Box display="flex" flexDirection="column" alignItems="center" py={2}>
                  <ProfilePicture avatar={user.avatar} width="70%" height="auto" />
                  <Typography variant="subtitle2">
                    {user.name}
                  </Typography>
                </Box>
              </Paper>
            </MaterialLink>
          </Grid>
        )) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>
                  Esse usuário não possui nenhum seguidor.
                </Box>
              </Paper>
            </Grid>

          )}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({ followers: state.users.user.followers })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserFollowers }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowers)
