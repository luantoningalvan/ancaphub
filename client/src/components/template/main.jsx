import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 240px)',
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8)
    },
  },
  padding: {
    padding: theme.spacing(3)
  },
  warning: {
    background: theme.palette.secondary.main,
    color: '#333',
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2)
  }
}));

export default function Main(props) {
  const classes = useStyles();

  return (
    <main
      className={clsx(classes.content, {
        [classes.padding]: !props.noPadding
      })}>

      {props.children}
    </main>
  );
}
