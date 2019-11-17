import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import Template from '../../components/template';

export default props => (
  <Template>
    <Box mb={3}>
      <Typography variant="h4" component="h2">
        Página não Disponível
      </Typography>
      <Typography variant="body2" component="p">
        Esta página não está disponível ou você não possui acesso a ela.
      </Typography>
    </Box>
  </Template>
);
