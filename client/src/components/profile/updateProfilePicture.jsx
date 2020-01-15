import React, { useState } from 'react';
import { Box, Avatar, CircularProgress, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from '../../services/api';

function ImageUpload({ field, form }) {
  const { values, setFieldValue } = form;
  const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const res = await axios.post(`/api/files`, formData, config);
        setLoading(false)
        setFieldValue('avatar', res.data.url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box display="flex"  justifyContent="center"mb={2}>
        <Avatar style={{ width: 120, height: 120, background: `url(${values.avatar})`, backgroundSize: '120px 120px' }}>
          {loading ? (<CircularProgress />) : (
            <>
              <input accept="image/jpeg, image/png" onChange={event => uploadAvatar(event.target.files[0])} style={{ display: 'none' }} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton color="secondary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          )}
        </Avatar>
    </Box>
  );
}

export default ImageUpload;
