import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Template from '../template/template'
import Hero from '../template/hero'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllUsers, deleteUser } from './userActions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function Users(props) {
  const classes = useStyles();
  useEffect(() => props.fetchAllUsers(), [])

  return (
    <Template>
      <Hero title="Usuários" />

      <Box mt={3}>
        <Container>
          {!isEmpty(props.users) && (

            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.users.map(user =>
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/users/user/${user._id}/edit`} >
                          <IconButton aria-label="Editar">
                            <EditIcon />
                          </IconButton>
                        </Link>

                        <IconButton aria-label="Delete" onClick={() => props.deleteUser(user._id)} >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Container>
      </Box>
    </Template>
  )
}

const mapStateToProps = (state) => ({ users: state.users.users })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllUsers, deleteUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users)