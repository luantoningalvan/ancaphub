import React, { useState, useCallback } from "react";
import Dialog from "../ui/Dialog";
import CardBody from "../ui/CardBody";
import CardHeader from "../ui/CardHeader";
import UploadIcon from "react-ionicons/lib/IosCloudUploadOutline";
import styled from "styled-components";
import CloseIcon from "react-ionicons/lib/MdClose";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Slider from "rc-slider";
import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import { updateProfilePictureRequest as updateProfilePicture } from "../../actions/users";

const UplaodArea = styled.label`
  height: 250px;
  width: 300px;
  border-radius: 8px;
  border: 2px dashed ${(props) => props.theme.palette.text.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  svg {
    fill: ${(props) => props.theme.palette.text.secondary};
    height: 40px;
    width: 40px;
    margin-bottom: 16px;
  }
`;

const CropperStyle = styled.div`
width:450px;

.crop-content {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.slider {
  padding: 16px;
}
`

export default ({ open, onClose }) => {
  const [image, setImage] = useState("");
  const [cropState, setCropState] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropInfo, setCropInfo] = useState({});
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropInfo({ croppedArea, croppedAreaPixels });
  }, []);

  const handleSelectImage = (e) => {
    setImage({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
    handleCrop();
  };

  const handleCrop = () => {
    setCropState(!cropState);
  };

  const handleCancel = () => {
    setImage("");
    onClose();
  };

  const handleUpload = async () => {
    if (image.image) {
      let formData = new FormData();
      formData.append("data", JSON.stringify(cropInfo));
      formData.append("file", image.image);
      dispatch(updateProfilePicture(formData));
      handleCrop();
      handleCancel()
    }
  };

  return (
    <Dialog show={open}>
      <CardHeader style={{padding: 8}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
          <h3>Editar Avatar</h3>
        </div>
        {image !== "" && (
          <Button color="secondary" onClick={handleUpload}>Atualizar</Button>
        )}
      </CardHeader>

      {image !== "" ? (
          <CropperStyle>
          <div className="crop-content">
            <Cropper
              image={image.preview}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
            />
          </div>
          <div className="slider">
          <Slider
           
            value={zoom}
            min={1}
            max={3}
            color="secondary"
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(value) => setZoom(value)}
          />
          </div>
          </CropperStyle>
      ) : (
        <CardBody>
          <UplaodArea htmlFor="upload-avatar">
            <input
              id="upload-avatar"
              type="file"
              name="file"
              onChange={handleSelectImage}
            />
            <UploadIcon />
            Clique para enviar uma foto
          </UplaodArea>
        </CardBody>
      )}
    </Dialog>
  );
};
