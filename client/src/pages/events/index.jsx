import React from 'react';
import {
  Box,
  Typography,
  Container
} from '@material-ui/core';
import Title from '../../components/template/titleComponent'

export default props => (
  <Container>
    <Box mt={2}>
    <Title title="Eventos" />
    <Box mb={3}>
      <Typography variant="h4" component="h2">
        Eventos
      </Typography>
      <Typography variant="body2" component="p">
        Esta página está em construção.
      </Typography>
    </Box>
    </Box>
  </Container>
);
