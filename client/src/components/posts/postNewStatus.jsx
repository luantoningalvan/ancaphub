import React, { useState } from 'react';

// Material UI
import { Paper, Box, IconButton, Button} from '@material-ui/core';
import {
  Image as ImageIcon,
  Poll as PollIcon,
  Movie as VideoIcon
} from '@material-ui/icons'

// Text Editor
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import basicTextStylePlugin from './plugins/basicTextStylePlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import createListPlugin from "draft-js-list-plugin";

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost } from '../../actions/postActions';

const listPlugin = createListPlugin();
const plugins = [addLinkPlugin,basicTextStylePlugin, listPlugin]

function PostNewStatus(props) {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );

  const contentState = editorState.getCurrentContent();

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  function handleSubmit() {
    let note = {content: convertToRaw(contentState)}
    note["content"] = JSON.stringify(note.content)
    props.createPost(note.content)
  }

  		// Determine whether placeholder should be displayed (to avoid overlap with lists)
      const blockType = RichUtils.getCurrentBlockType(editorState);
      const isOl = blockType === "ordered-list-item";
      const isUl = blockType === "unordered-list-item";
      const placeholderIsVisible = !isOl && !isUl;

  return (
    <Box mb={2}>
    <Paper>
      <Box p={2}>
        <Editor 
        editorState={editorState} 
        onChange={setEditorState} 
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholderIsVisible ? "No que você está pensando?" : ""}
        plugins={plugins}
        spellCheck
        />
      </Box>
      <Box display="flex" justifyContent="space-between" px={2} pb={2}>
        <div>
        <IconButton size="small" edge="start" disabled><ImageIcon /></IconButton>
        <IconButton size="small" disabled><VideoIcon /></IconButton>
        <IconButton size="small" disabled><PollIcon /></IconButton>
        </div>

        <Button 
          variant="contained" 
          disableElevation 
          color="secondary" 
          size="small" 
          disabled={!contentState.hasText()}
          onClick={handleSubmit}
        >
          Publicar
        </Button>
      </Box>
    </Paper>
        </Box>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createPost }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(PostNewStatus);
