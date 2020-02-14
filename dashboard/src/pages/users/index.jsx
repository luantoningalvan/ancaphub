import React, { useEffect } from 'react';
import {
  Paper,
  Container,
  Box
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';
import FullTable from '../../components/table/fullTable'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUsers, deleteUser } from '../../actions/userActions';


function Users({fetchAllUsers, users}) {
  useEffect(() => fetchAllUsers(), [fetchAllUsers]);

  return (
    <>
      <TitleComponent title="Usuários" />
      <Hero title="Usuários" />

      <Box mt={3}>
        <Container>
            <Paper>
              <FullTable
              fields={[
                { label: "Nome", key: "name" },
                { label: "Usuário", key: "username", align: "left" },
              ]}
              data={users.users}
              actions={[
                { label: "Editar", icon: EditIcon },
                { label: "Deletar", icon: DeleteIcon }
              ]}
            />
            </Paper>
        </Container>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllUsers, deleteUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
