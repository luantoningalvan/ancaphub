import React, { useEffect } from 'react';
import Template from '../../template/template';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function FindPeople(props) {
  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Encontrar Pessoas</Typography>
      </Box>
    </Template>
  )
}

export default FindPeople