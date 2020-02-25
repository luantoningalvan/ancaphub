import React, { useEffect } from 'react'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import { Dialog } from '@material-ui/core'

export default ({ open, post, closeFunc }) => {
  useEffect(() => {
    if(open) {
    }
  }, [open])

  return (
    <>
      { open ? (
        <Dialog open={open} onClose={closeFunc}>
          Top mano
        </Dialog>
      ) : <></>}
    </>
  )
}