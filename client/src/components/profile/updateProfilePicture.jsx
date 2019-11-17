import React from 'react';
import { Grid } from '@material-ui/core';
import axios from '../../services/api';
import ProfilePicture from './profilePicture';


function ImageUpload({ field, form }) {
  const { values, setFieldValue } = form;

  const uploadAvatar = async avatar => {
    if (avatar) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      let formData = new FormData();
      formData.append('file', avatar);

      try {
        const res = await axios.post(`/api/upload`, formData, config);
        setFieldValue('avatar', res.data.url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <ProfilePicture avatar={values.avatar} width="120px" height="120px" />
      </Grid>
      <Grid item xs={9}>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={event => uploadAvatar(event.target.files[0])}
        />
        <input type="hidden" name="avatar" value={values.avatar} />
      </Grid>
    </Grid>
  );
}

export default ImageUpload;
