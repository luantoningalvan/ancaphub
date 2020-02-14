import React, { useEffect } from 'react';
import {
  Paper,
  Container,
  Box,
  IconButton
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  SettingsRounded as ManageIcon
} from '@material-ui/icons';
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';
import FullTable from '../../components/table/fullTable'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUsers } from '../../actions/userActions';
import { Link } from "react-router-dom";

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
              actions={(user) => 
                <>
                  <IconButton component={Link} to={`/users/${user._id}`}><ManageIcon /></IconButton>
                  <IconButton disabled><DeleteIcon /></IconButton>
                </>
              }
            />
            </Paper>
        </Container>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllUsers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
