import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import GroupCard from '../../components/groups/groupCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllPublicGroups, fetchAllAuthGroups } from '../../actions/groupActions';
import isEmpty from 'is-empty'

const Groups = props => {

  useEffect(() => {
    props.fetchAllPublicGroups()
  }, [])

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.fetchAllAuthGroups()
    }
  }, [props.auth.isAuthenticated])

  return (
    <Template>
      <Title title="Grupos" />
      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Grupos
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Seus Grupos
          </Typography>

          {!isEmpty(props.groups.authGroups) ? (
            <Grid container spacing={2}>
              {props.groups.authGroups.map(group => (
                <Grid item xs={3}>
                  <GroupCard group={group} />
                </Grid>
              ))}
            </Grid>
          ) : (
              <Paper>
                <Box p={2}>
                  <Typography>Você não participa de nenhum grupo ainda.</Typography>
                </Box>
              </Paper>
            )}
        </Box>
        <Box mt={2}>
          <Typography variant="h6" component="p" gutterBottom>
            Grupos Públicos
          </Typography>

          {!isEmpty(props.groups.allGroups) ? (
            <Grid container spacing={2}>
              {props.groups.allGroups.map(group => (
                <Grid item xs={3}>
                  <GroupCard group={group} />
                </Grid>
              ))}
            </Grid>
          ) : (
              <Paper>
                <Box p={2}>
                  <Typography>Nenhum grupo público encontrado.</Typography>
                </Box>
              </Paper>
            )}
        </Box>
      </Box>
    </Template>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllPublicGroups, fetchAllAuthGroups }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);