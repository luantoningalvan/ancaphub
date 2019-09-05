import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import loadImage from '../utils/loadImage';

export default props => (
  <>
    {props.avatar && props.avatar != '' ? (
      <Avatar
        src={`http://localhost:3000/public/images/uploads/${props.avatar}`}
        alt={props.name}
        style={{ height: props.height, width: props.width, ...props.style }}
      />
    ) : (
      <Avatar
        src={loadImage('defaultProfilePicture.png')}
        alt="Foto de perfil genérica"
        style={{ height: props.height, width: props.width, ...props.style }}
      />
    )}
  </>
);
