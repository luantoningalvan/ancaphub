import React from 'react';
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreIcon from '@material-ui/icons/Restore';

export default function Published({ item, deleteItem }) {
  function confirmDeletion(item) {
    const confirm = window.confirm(
      `Você deseja excluir definitivamente "${item.title}"?`
    );

    if (confirm) {
      deleteItem(item._id);
    }
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        aria-label="Delete"
        onClick={() => confirmDeletion(item)}>
        <DeleteForeverIcon />
      </IconButton>

      <IconButton aria-label="Restaurar">
        <RestoreIcon />
      </IconButton>
    </Box>
  );
} 
