import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Slider
} from '@material-ui/core';
import {
  PhotoCamera as CameraIcon,
  ArrowBack as ArrowBackIcon
} from '@material-ui/icons';
import Cropper from 'react-easy-crop'
import defaultProfilePicture from '../../assets/images/defaultProfilePicture.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfilePicture } from '../../actions/userActions';

function ImageUpload({ updateProfilePicture, form, user}) {
  const [image, setImage] = useState("")
  const [cropState, setCropState] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropInfo, setCropInfo] = useState({})

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropInfo({croppedArea, croppedAreaPixels})
  }, [])

  const useStyles = makeStyles({
    profilePicture: {
      width: 120,
      height: 120,
      background: `url(${user.user.avatar ? user.user.avatar : defaultProfilePicture})`,
      backgroundSize: '120px 120px'
    },
    input: {
      display: 'none',
    },
    cropContent: {
      width: '100%',
      height: '90vh',
      overflow: 'hidden',
      position: 'relative',
    },
    slider: {
      margin: '5px auto',
      width: '50%',
    }
  })

  const classes = useStyles()

  const handleSelectImage = (e) => {
    setImage({image:e.target.files[0], preview: URL.createObjectURL(e.target.files[0])})
    handleCrop()
  }

  const handleCrop = () => {
    setCropState(!cropState)
  }

  const handleUpload = async () => {
    if (image.image) {
      let formData = new FormData();
      formData.append('data', JSON.stringify(cropInfo))
      formData.append('file', image.image);

      updateProfilePicture(formData)
      handleCrop()
    }
  };

  return (
    <>
      <Dialog open={cropState} onClose={handleCrop} styles={{root: classes.cropDialog}} fullWidth maxWidth='sm'>
        <DialogTitle disableTypography style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label="Close"
              color="secondary"
              size="small"
              onClick={handleCrop}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" style={{ marginLeft: 8 }}>Cortar Imagem</Typography>
          </div>
          <Button color="secondary" variant="contained" onClick={handleUpload} disabled={user.loading}>
            Aplicar
          </Button>
        </DialogTitle>
        <DialogContent className={classes.cropContent}>
          <Cropper
          image={image.preview}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        </DialogContent>
        <DialogActions>
        <Slider
          value={zoom}
          min={1}
          max={3}
          color="secondary"
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
          className={classes.slider}
        />
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar className={classes.profilePicture}>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleSelectImage} />
          <label htmlFor="icon-button-file">
            <IconButton aria-label="upload picture" component="span">
              <CameraIcon />
            </IconButton>
          </label>
        </Avatar>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({ user: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({updateProfilePicture}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUpload);

