import React, { useState, useCallback } from 'react'
import Dialog from '../ui/Dialog'
import CardBody from '../ui/CardBody'
import CardHeader from '../ui/CardHeader'
import UploadIcon from 'react-ionicons/lib/IosCloudUploadOutline'
import styled from 'styled-components'
import CloseIcon from "react-ionicons/lib/MdClose";
import IconButton from "../ui/IconButton";

const UplaodArea = styled.div`
  height: 250px;
  width:300px;
  border-radius: 8px;
  border: 2px dashed ${props => props.theme.palette.text.secondary };
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  cursor:pointer;

  svg  {
    fill: ${props => props.theme.palette.text.secondary };
    height:40px;
    width:40px;
    margin-bottom:16px;
  }
`

export default ({open, onClose}) => {
  const [image, setImage] = useState("")
  const [cropState, setCropState] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropInfo, setCropInfo] = useState({})

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropInfo({croppedArea, croppedAreaPixels})
  }, [])

  const handleSelectImage = (e) => {
    setImage({image:e.target.files[0], preview: URL.createObjectURL(e.target.files[0])})
    handleCrop()
  }

  const handleCrop = () => {
    setCropState(!cropState)
  }

  /*const handleUpload = async () => {
    if (image.image) {
      let formData = new FormData();
      formData.append('data', JSON.stringify(cropInfo))
      formData.append('file', image.image);

      updateProfilePicture(formData)
      handleCrop()
    }
  };*/

  return (
    <Dialog show={open}>
          <CardHeader>
            <div style={{display:'flex', alignItems:'center'}}>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
            <h3>Editar Perfil</h3>
            </div>
          </CardHeader>
      <CardBody>
        <UplaodArea>
          <UploadIcon />
          Arraste ou clique para enviar uma foto
        </UplaodArea>
      </CardBody>
    </Dialog>
  )
}