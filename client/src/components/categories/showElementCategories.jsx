import React from 'react';
import { Chip, Box } from '@material-ui/core';
import { Link } from 'react-router-dom'
import isEmpty from 'is-empty';

function Categories(props) {
  return (
    <>
      {!isEmpty(props.categories) ? (
        <Box mb={2}>
          {props.categories.map(cat => (
            <Chip
              key={cat._id}
              label={cat.name}
              component={Link}
              clickable
              to={`/categories/${cat._id}`}
              variant="default"
              color="primary"
              style={{ marginRight: '8px' }}
            />
          ))}
        </Box>
      ) : (
          <p style={{ color: 'white', marginBottom: '10px' }}>
            Não categorizado.
        </p>
        )}
    </>
  );
}

export default Categories;
