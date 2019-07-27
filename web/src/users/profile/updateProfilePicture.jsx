import React from 'react';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
import loadImage from '../../utils/loadImage'
import axios from "axios";

function ImageUpload({ field, form, ...props }) {
  const { values, errors, touched, setFieldValue } = form

  const uploadAvatar = async avatar => {
    if (avatar) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      let formData = new FormData();
      formData.append('file', avatar)

      try {
        const res = await axios.post(`/api/upload`, formData, config)
        setFieldValue('avatar', res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Grid container >
      <Grid item xs={3}>
        {values.avatar != '' ? (
          <Avatar src={`http://localhost:3000/public/images/uploads/${values.avatar}`} style={{ width: '100%', height: 'auto', marginBottom: "10px" }} />
        ) : (
            <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" style={{ width: '120px', height: '120px', marginBottom: "10px" }} />
          )}

      </Grid>
      <Grid item xs={9}>
        <input
          type="file"
          onChange={(event) => uploadAvatar(event.target.files[0])}
        />
        <input type="hidden" name="avatar" value={values.avatar} />
      </Grid>
    </Grid>
  )
}

export default ImageUpload