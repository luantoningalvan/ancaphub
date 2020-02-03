import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import Title from '../../components/template/titleComponent'

export default props => (
  <>
    <Title title="Projetos" />
    <Box mb={3}>
      <Typography variant="h4" component="h2">
        Projetos
      </Typography>
      <Typography variant="body2" component="p">
        Esta página está em construção.
      </Typography>
    </Box>
  </>
);
