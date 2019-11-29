import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { BrightnessMedium as DarkModeIcon } from '@material-ui/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setDarkMode } from '../../actions/templateActions'

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.primary.contrastText
  },
}));

const TopBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            ancaphub
          </Typography>
          <IconButton color="inherit" className={classes.button} onClick={() => props.setDarkMode()}>
            <DarkModeIcon />
          </IconButton>
          <Button color="secondary" variant="contained" component={Link} to="/">Entrar</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ setDarkMode }, dispatch)

export default connect(null, mapDispatchToProps)(TopBar)