import React, { useState } from 'react';
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
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.10),
    '&:focus': {
      backgroundColor: 'transparent'
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  locationSearchIcon: {
    marginLeft: theme.spacing(0.5),
    color: theme.palette.text.primary
  },
  searchIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary
  },
  inputRoot: {
    color: theme.palette.text.primary
  },
  inputInput: {
    padding: theme.spacing(1)
  }
}));

const SearchBox = props => {
  const classes = useStyles();
  const [term, setTerm] = useState("")
  
  const search = () => {
    if(term !== ""){
      props.history.push(`/search?s=${term}`)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      search()
    }
  }

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
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton className={classes.searchIcon} size="small" onClick={search}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default withRouter(SearchBox)
