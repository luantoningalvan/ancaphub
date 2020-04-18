import React from 'react'
import SaveIcon from 'react-ionicons/lib/IosBookmarkOutline'
import UnsaveIcon from 'react-ionicons/lib/IosBookmark'
import IconButton from '../ui/IconButton'

export default props => {
  return(
    <IconButton color="primary" onClick={() => alert("Função indispomível.")}>
      <SaveIcon />
    </IconButton>
  )
}