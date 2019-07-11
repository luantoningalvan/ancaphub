import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ActivityCard from './activityCard'

function LoggedUserMenu(props) {
  return (
    <React.Fragment>
      <Paper>
        <Box p={2}>
          <TextField placeholder="Publicar Status" fullWidth multiline rows="2" />
          <Box pt={2}>
            <Button color="primary" variant="contained" size="small">Publicar</Button>
          </Box>
        </Box>
      </Paper>

      <ActivityCard />
    </React.Fragment>
  );
}

export default LoggedUserMenu
