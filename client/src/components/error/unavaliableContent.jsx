import React from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

export default props => (
    <Box textAlign="center">
      <ErrorOutlineOutlinedIcon fontSize="large"/>
      <Typography variant="h4" component="h2" gutterBottom>
        Página não Disponível
      </Typography>
      <Typography variant="body2" component="p">
        Esta página não está disponível ou você não possui acesso a ela.
      </Typography>
    </Box>
);
