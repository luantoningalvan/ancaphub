import React from 'react'
import {
  Typography
} from '@material-ui/core'
import { EditorState, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import parser from 'html-react-parser'

export default ({ post }) => {
  const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)));
  
  return (
    <Typography variant="body1">
    {parser(stateToHTML(editorState.getCurrentContent()))}
    </Typography>  
  )
}
