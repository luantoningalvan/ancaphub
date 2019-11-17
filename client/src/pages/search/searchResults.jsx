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
        Resultados para{' '}
      </Typography>
    </Box>
  </Template>
);
