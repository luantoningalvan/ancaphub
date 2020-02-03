import React from 'react';
import {
  Box,
  IconButton
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Published({ item, deleteItem }) {
  function confirmDeletion(item) {
    const confirm = window.confirm(
      `Você realmente deseja excluir "${item.title}"?`
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
        <DeleteIcon />
      </IconButton>

      <Link
        to={`/collection/${item.type}/edit/${item._id}`}>
        <IconButton aria-label="Editar">
          <EditIcon />
        </IconButton>
      </Link>
    </Box>
  );
} 
