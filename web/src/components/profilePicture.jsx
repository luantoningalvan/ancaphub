import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import loadImage from '../utils/loadImage'

export default props => (
  <div>
    {
      props.avatar && props.avatar != "" ? (
        <Avatar src={`http://localhost:3000/public/images/uploads/${props.avatar}`} alt={props.name} />
      ) : (
          <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" />
        )
    }
  </div>
)
