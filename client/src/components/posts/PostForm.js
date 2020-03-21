import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Paper from "../ui/Paper";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";

// Icons
import ImageIcon from "react-ionicons/lib/IosImageOutline";
import VideoIcon from "react-ionicons/lib/IosVideocamOutline";
import PollIcon from "react-ionicons/lib/IosPodiumOutline";
import CloseIcon from "react-ionicons/lib/IosClose";

// Text Editor
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import basicTextStylePlugin from "../editor/plugins/basicTextStylePlugin";
import addLinkPlugin from "../editor/plugins/addLinkPlugin";
import createListPlugin from "draft-js-list-plugin";

// i18n
import { FormattedMessage } from "react-intl";

const FormActions = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  border-top: 1px solid #2f3749;
  background: rgba(0, 0, 0, 0.1);
`;

const TextBox = styled.div`
  padding: 20px;
  min-height: 100px;
  .public-DraftEditor-content {
    min-height: 60px;
  }
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 5px;
`;

const ImageButtonLabelWrapper = styled.div`
  [type="file"] {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
  }

  svg {
    cursor: pointer;
    fill: ${props => props.theme.pallete.text.primary};
    height: 2em;
    width: 2em;
    margin: 2.5px 0;
    padding: 2px;
  }

  label {
    clear: both;
  }

  [type="file"] + label {
    cursor: pointer;
    display: inline-block;
  }
`;

const listPlugin = createListPlugin();
const plugins = [addLinkPlugin, basicTextStylePlugin, listPlugin];

function PostForm(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [thumbnail, setThumbnail] = useState(null);
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const contentState = editorState.getCurrentContent();

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  function handleSubmit() {
    let note = { content: convertToRaw(contentState) };
    note["content"] = JSON.stringify(note.content);
    setEditorState(EditorState.createEmpty());
  }

  const handleRemoveImage = () => {
    setThumbnail(null);
    document.getElementById("image-input").value = null;
  };

  // Determine whether placeholder should be displayed (to avoid overlap with lists)
  const blockType = RichUtils.getCurrentBlockType(editorState);
  const isOl = blockType === "ordered-list-item";
  const isUl = blockType === "unordered-list-item";
  const placeholderIsVisible = !isOl && !isUl;

  return (
    <div style={{ width: "100%" }}>
      <Paper>
        <TextBox p={2}>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder={
              placeholderIsVisible ? (
                <FormattedMessage id="components.postNewStatus.thinking" />
              ) : (
                ""
              )
            }
            plugins={plugins}
            spellCheck
          />
        </TextBox>
        {thumbnail && (
          <FormActions>
            <PreviewImage src={preview} alt="preview" />
            <IconButton onClick={() => handleRemoveImage()}>
              <CloseIcon />
            </IconButton>
          </FormActions>
        )}
        <FormActions>
          <ImageButtonLabelWrapper>
            <label>
              <ImageIcon />
              <input
                id="image-input"
                type="file"
                onChange={event => setThumbnail(event.target.files[0])}
              />
            </label>
          </ImageButtonLabelWrapper>
          <div>
            <IconButton size="small" disabled>
              <VideoIcon />
            </IconButton>
            <IconButton size="small" disabled>
              <PollIcon />
            </IconButton>
          </div>

          <Button
            variant="contained"
            disableElevation
            color="secondary"
            size="small"
            style={{ marginLeft: "auto" }}
            disabled={!contentState.hasText()}
            onClick={handleSubmit}
          >
            Publicar
          </Button>
        </FormActions>
      </Paper>
    </div>
  );
}

export default PostForm;
