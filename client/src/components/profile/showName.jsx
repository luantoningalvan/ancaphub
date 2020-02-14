import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import clsx from 'clsx'

export default ({ user, fontSize }) => {
  const useStyles = makeStyles(theme => ({
    userName: {
      fontWeight: 'bold',
      color: "inherit",
      textDecoration: 'none',
      fontSize: fontSize || 15
    },
    verifiedUser: {
      background: theme.palette.secondary.main,
      borderRadius: 15,
      color: 'white',
      padding: '5px 10px',
      marginRight: 5,
    }
  }))

  const classes = useStyles()

  return(
    <Link title={user.isVerified && "Verificado"} to={`/${user._id}`} className={clsx(classes.userName, { [classes.verifiedUser]: user.isVerified })}>
      {user.name}
    </Link>
  )
};