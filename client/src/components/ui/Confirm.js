import React from 'react'
import Dialog from './Dialog'
import Button from './Button'
import IconButton from './IconButton'
import CloseIcon from 'react-ionicons/lib/MdClose'

export default ({show, title, message, onClose, onConfirm}) => {
  return (
    <Dialog show={show}>
      <div className="dialog-header">
        <h4>{title}</h4>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </div>
      
      <div className="dialog-message">
        <p>{message}</p>
      </div>
      
      <div className="dialog-actions">
        <Button onClick={onClose} size="small" color="primary" variant="outlined">Cancelar</Button>
        <Button onClick={onConfirm} size="small" color="secondary">Deletar</Button>
      </div>
    </Dialog>
  )
}