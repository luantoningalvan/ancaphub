import React, { useState } from "react";
import styled from 'styled-components'
import Paper from "../ui/Paper";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";

// Icons
import ImageIcon from 'react-ionicons/lib/IosImageOutline'
import VideoIcon from 'react-ionicons/lib/IosVideocamOutline'
import PollIcon from 'react-ionicons/lib/IosPodiumOutline'

// Text Editor
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import 'draft-js/dist/Draft.css';
import basicTextStylePlugin from '../editor/plugins/basicTextStylePlugin';
import addLinkPlugin from '../editor/plugins/addLinkPlugin';
import createListPlugin from "draft-js-list-plugin";

// i18n
import { FormattedMessage } from "react-intl";

const FormActions = styled.div`
  display:flex;
  justify-content: space-between;
  padding: 15px;
  border-top:1px solid #2f3749;
  background: rgba(0,0,0,.1)
`

const TextBox = styled.div`
  padding: 20px;
  min-height: 100px;
  .public-DraftEditor-content {
     min-height: 60px;
  }
`;

const listPlugin = createListPlugin();
const plugins = [addLinkPlugin, basicTextStylePlugin, listPlugin]

function PostForm(props) {
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
    let note = { content: convertToRaw(contentState) }
    note["content"] = JSON.stringify(note.content)
    setEditorState(EditorState.createEmpty())
  }

  // Determine whether placeholder should be displayed (to avoid overlap with lists)
  const blockType = RichUtils.getCurrentBlockType(editorState);
  const isOl = blockType === "ordered-list-item";
  const isUl = blockType === "unordered-list-item";
  const placeholderIsVisible = !isOl && !isUl;

  return (
      <Paper>
        <TextBox p={2}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder={placeholderIsVisible ? <FormattedMessage id="components.postNewStatus.thinking" /> : ""}
            plugins={plugins}
            spellCheck
          />
        </TextBox>
        <FormActions>
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
        </FormActions>
      </Paper>
  );
}

export default PostForm