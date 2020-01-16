import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons'
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import GroupCard from '../../components/groups/groupCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllPublicGroups, fetchAllAuthGroups } from '../../actions/groupActions';
import isEmpty from 'is-empty'
import NewGroup from '../../components/groups/newGroup'
import LoadContent from '../../components/loaders/loadContent'

const Groups = ({groups,auth,fetchAllAuthGroups}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchAllPublicGroups()
  }, [])

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchAllAuthGroups()
    }
  }, [auth.isAuthenticated, fetchAllAuthGroups])

  return (
    <Template>
      <Title title="Grupos" />

      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Criar novo Grupo</DialogTitle>
        <DialogContent>
          <NewGroup />
        </DialogContent>
      </Dialog>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Grupos
        </Typography>

        <Button startIcon={<AddIcon />} variant="contained" color="secondary" onClick={handleClick}>Criar Grupo</Button>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Seus Grupos
        </Typography>

        <LoadContent loading={groups.loading}>
          {!isEmpty(groups.authGroups) ? (
            <Grid container spacing={2}>
              {groups.authGroups.map(group => (
                <Grid item xs={3} key={group._id}>
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
        </LoadContent>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" component="p" gutterBottom>
          Grupos Públicos
        </Typography>

        <LoadContent loading={groups.loading}>
          {!isEmpty(groups.allGroups) ? (
            <Grid container spacing={2}>
              {groups.allGroups.map(group => (
                <Grid item xs={3} key={group._id}>
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
        </LoadContent>
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