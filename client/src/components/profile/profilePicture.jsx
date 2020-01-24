import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.png';

export default ({avatar, username, style, width, ...props}) => {
  const useStyles = makeStyles({
    picture: {
      width: width,
      height: "inherit",
      position: 'relative',
      ...style,
      "&:after": {
        content: "''",
        display: 'block',
        paddingBottom: '100%'
      }
    },
    img: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
  })
  const classes = useStyles()
  return (
    <>
      {avatar && avatar !== '' ? (
        <Avatar
          src={avatar}
          alt={username}
          className={classes.picture}
          classes={{ img: classes.img }}
          {...props}
        />
      ) : (
          <Avatar
            src={defaultProfilePicture}
            alt="Foto de perfil genérica"
            className={classes.picture}
            classes={{ img: classes.img }}
            {...props}
          />
        )}
    </>
  )
}
