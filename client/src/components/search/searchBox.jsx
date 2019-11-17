import React from 'react';
import {
  InputBase,
  IconButton,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  LocationSearching as LocationSearchIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  locationSearchIcon: {
    marginLeft: theme.spacing(0.5),
    color: '#757575'
  },
  searchIcon: {
    paddingRight: theme.spacing(1),
    height: '24px',
    color: '#757575'
  },
  inputRoot: {
    color: '#757575'
  },
  inputInput: {
    padding: theme.spacing(1)
  }
}));

export default function SearchBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <IconButton
        component={Link}
        to="/find-people"
        className={classes.locationSearchIcon}
        size="small">
        <LocationSearchIcon />
      </IconButton>
      <InputBase
        placeholder="Buscar…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'Buscar' }}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
}
