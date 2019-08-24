import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link, Redirect } from 'react-router-dom'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  locationSearchIcon: {
    marginLeft: theme.spacing(0.5),
    color: "#757575"
  },
  searchIcon: {
    paddingRight: theme.spacing(1),
    height: '24px',
    color: "#757575"
  },
  inputRoot: {
    color: "#757575",
  },
  inputInput: {
    padding: theme.spacing(1),
  }
}));

export default function SearchBox(props) {
  const classes = useStyles();

  const search = (text) => {
    console.log(text)
  }

  return (
    <div className={classes.search}>
      <IconButton component={Link} to="/find-people" className={classes.locationSearchIcon} size="small">
        <LocationSearchIcon />
      </IconButton>
      <InputBase
        placeholder="Buscar…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Buscar' }}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  )
}