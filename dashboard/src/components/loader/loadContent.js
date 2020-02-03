import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export default ({ loading, children }) => {
  if (!loading) {
    return children
  } else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%">
        <CircularProgress />
      </Box>
    );
  }
}
