import React, { useEffect } from 'react'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty'

const useStyles = makeStyles(theme => ({
    chip: {
      marginLeft: theme.spacing(0.5),
    },
}));

function Categories(props) {
    const classes = useStyles()

    return (
      <>
      { !isEmpty(props.categories) ? (
        <Box mb={2}>
          <span>Categorias:</span>
          { props.categories.map(cat => (
            <Chip
              key={cat._id}
              label={cat.name}
              className={classes.chip}
            />
          )) }
        </Box>
      ) : (
        <p>Não categorizado.</p>
      )}
      </>
    )
}

export default Categories
