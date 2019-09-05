import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Template from '../../template/template';
import Hero from '../../template/hero';
import { connect } from 'react-redux';

function Dashboard(props) {
  return (
    <Template>
      <Hero title="Dashboard" />
      <Box mt={3}>
        <Container>Olá {props.auth.user.name}</Container>
      </Box>
    </Template>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
