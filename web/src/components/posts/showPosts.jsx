import React from 'react';
import PostCard from './postCard';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import isEmpty from 'is-empty';

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
