import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core';
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.png';

export default props => {
  const useStyles = makeStyles({
    picture: {
      width: props.width,
      height: "inherit",
      position: 'relative',
      ...props.style,
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
      {props.avatar && props.avatar !== '' ? (
        <Avatar
          src={props.avatar}
          alt={props.name}
          className={classes.picture}
          classes={{ img: classes.img }}
        />
      ) : (
          <Avatar
            src={defaultProfilePicture}
            alt="Foto de perfil genérica"
            className={classes.picture}
            classes={{ img: classes.img }}
          />
        )}
    </>
  )
}
