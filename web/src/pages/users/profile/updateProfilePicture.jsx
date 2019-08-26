import React from 'react';
import Grid from '@material-ui/core/Grid'
import ProfilePicture from '../../../components/profilePicture'
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
        <ProfilePicture avatar={values.avatar} width="120px" height="120px" />
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