import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Paper from "../ui/Paper";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Card from "../ui/Card";
import CardFooter from "../ui/CardFooter";
import CardBody from "../ui/CardBody";
import TextField from "../ui/TextField";
import ReactPlayer from 'react-player'

// Icons
import ImageIcon from "react-ionicons/lib/IosImageOutline";
import EmbedIcon from "react-ionicons/lib/IosCode";
import PollIcon from "react-ionicons/lib/IosPodiumOutline";
import CloseIcon from "react-ionicons/lib/IosClose";
import AddIcon from "react-ionicons/lib/IosAdd";

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
`;

const PreviewImage = styled.img`
  width: 100%;
  height:auto;
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

const MediaPreview = styled.div`
  width: 100%;  
  border-radius: 16px;
  overflow:hidden;
  position: relative;
  margin-top:20px;
  border: 1px solid #2f3749;
`

const ImageBox = styled.div`
  max-height:350px;
.close-icon {
  height:38px;
  width:38px;
  background: red;
  position: absolute;
  right:16px;
  top:16px;
  z-index: 100;
}
`

const PollBox = styled.div`
  display: flex;
  padding:15px;

  ul { flex: 1; }
  li { list-style: none; }
`

const listPlugin = createListPlugin();
const plugins = [addLinkPlugin, basicTextStylePlugin, listPlugin];

function PostForm(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const contentState = editorState.getCurrentContent();
  const [media, setMedia] = useState(null);

  const preview = useMemo(() => {
    return media && media.type == "image" ? URL.createObjectURL(media.data) : null;
  }, [media]);


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

  const handleAddImage = (e) => {
    setMedia({
      type: "image",
      data: e.target.files[0]
    })
  }

  const handleAddEmbed = (e) => {
    setMedia({
      type: "embed",
      data: {
        url: ""
      }
    })
  }

  const handleAddPoll = () => {
    setMedia({
      type: "poll",
      data: [
        { text: "" },
        { text: "" },
      ]
    })
  }

  const addPollOption = () => {
    if (media.data.length < 4) {
      setMedia({ ...media, data: [...media.data, { text: "" }] })
    }
  }

  const handleRemoveMedia = () => {
    setMedia(null);
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
          {media && (
            <MediaPreview>
              {media.type == "image" && (
                <ImageBox>
                  <IconButton onClick={handleRemoveMedia} className="close-icon">
                    <CloseIcon />
                  </IconButton>
                  <PreviewImage src={preview} alt="preview" />
                </ImageBox>
              )}
              {media.type == "poll" && (
                <Card>
                  <PollBox>
                    <ul>
                      {media.data.map((option, index) => (
                        <li>
                          <TextField 
                          fullWidth 
                          type="text" 
                          placeholder={`Opção ${index + 1} ${index >= 2 ? "(opcional)" : ""}`} 
                          style={{ marginBottom: 8 }} 
                          />
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'flex-end', minWidth:56, padding: 10 }}>
                      {media.data.length < 4 && (
                        <IconButton color="secondary" disableElevation>
                          <AddIcon onClick={addPollOption} />
                        </IconButton>
                      )}
                    </div>
                  </PollBox>
                  <CardFooter label="Remover Enquete" action={handleRemoveMedia} />
                </Card>
              )}
              {media.type == "embed" && (
                <Card>
                  <CardBody>
                    <TextField
                      fullWidth
                      placeholder="Link do Vídeo"
                      value={media.data.url}
                      onChange={(e) => setMedia({ type: "embed", data: { url: e.target.value } })}
                    />
                    {media.data.url !== "" && (
                      <ReactPlayer url={media.data.url} light style={{ marginTop: 8 }} width="100%" />
                    )}
                  </CardBody>

                  <CardFooter label="Remover Incorporação" action={handleRemoveMedia} />
                </Card>
              )}
            </MediaPreview>
          )}
        </TextBox>
        <FormActions>
          <ImageButtonLabelWrapper>
            <label>
              <ImageIcon />
              <input
                id="image-input"
                type="file"
                onChange={handleAddImage}
              />
            </label>
          </ImageButtonLabelWrapper>
          <IconButton size="small" onClick={handleAddPoll}>
            <PollIcon />
          </IconButton>
          <IconButton size="small" onClick={handleAddEmbed}>
            <EmbedIcon />
          </IconButton>

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
