import React from 'react'
import styled from 'styled-components'
import Paper from './Paper'
import Button from './Button'
import IconButton from './IconButton'
import CloseIcon from 'react-ionicons/lib/MdClose'

const Dialog = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  top:64px;
  left:0;
  position:fixed;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(0,0,0,.8);
  z-index:9999;

  .dialog-header {
    display:flex;
    padding:16px;
    justify-content:space-between;
    align-items:center;
    border-bottom: 1px solid ${props => props.theme.palette.border}
  }

  .dialog-message{padding:16px;}

  .dialog-actions {
    padding: 16px;
    display:flex;
    justify-content: flex-end;

    button:first-child {
      margin-right: 8px;
    }
  }
`

export default ({show, onClose, onConfirm}) => {
  if(!show) {
    return null;
  }

  return (
    <>
    <Dialog>
      <Paper className="content">
      <div className="dialog-header">
        <h4>Deletar postagem?</h4>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </div>
      
      <div className="dialog-message">
        <p>Você tem certeza que deseja deletar a postagem?</p>
      </div>
      
      <div className="dialog-actions">
        <Button onClick={onConfirm} size="small" color="primary" variant="outlined">Cancelar</Button>
        <Button onClick={onClose} size="small" color="secondary">Deletar</Button>
      </div>
    </Paper>
    </Dialog>
    </>
  )
}