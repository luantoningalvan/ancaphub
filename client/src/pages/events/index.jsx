import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'

export default props => (
  <Template>
    <Title title="Eventos" />
    <Box mb={3}>
      <Typography variant="h4" component="h2">
        Eventos
      </Typography>
      <Typography variant="body2" component="p">
        Esta página está em construção.
      </Typography>
    </Box>
  </Template>
);
