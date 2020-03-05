import React from 'react';
import {
  Paper,
  Box
} from '@material-ui/core';
import isEmpty from 'is-empty';
import PostCard from './postCard';

export default function ShowPosts(props) {
  return (
    <React.Fragment>
      {!isEmpty(props.posts) ? (
        props.posts.map(post => <PostCard post={post} key={post._id} />)
      ) : (
          <Paper>
            <Box p={2}>Nenhuma postagem disponível.</Box>
          </Paper>
        )}
    </React.Fragment>
  );
}
