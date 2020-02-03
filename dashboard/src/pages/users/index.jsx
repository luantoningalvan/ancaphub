import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import isEmpty from 'is-empty';
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUsers, deleteUser } from '../../actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}));

function Users({fetchAllUsers, users, deleteUser}) {
  const classes = useStyles();
  useEffect(() => fetchAllUsers(), [fetchAllUsers]);

  return (
    <>
      <TitleComponent title="Usuários" />
      <Hero title="Usuários" />

      <Box mt={3}>
        <Container>
          {!isEmpty(users) && (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/users/user/${user._id}/edit`}>
                          <IconButton aria-label="Editar">
                            <EditIcon />
                          </IconButton>
                        </Link>

                        <IconButton
                          aria-label="Delete"
                          onClick={() => deleteUser(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({ users: state.users.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllUsers, deleteUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
