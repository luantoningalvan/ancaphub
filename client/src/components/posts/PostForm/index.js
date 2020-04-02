import React, { useState, useMemo } from 'react';
import ReactPlayer from 'react-player';
import ImageIcon from 'react-ionicons/lib/IosImageOutline';
import EmbedIcon from 'react-ionicons/lib/IosCode';
import PollIcon from 'react-ionicons/lib/IosPodiumOutline';
import CloseIcon from 'react-ionicons/lib/IosClose';
import AddIcon from 'react-ionicons/lib/IosAdd';
import TextField from '../../ui/TextField';
import CardBody from '../../ui/CardBody';
import CardFooter from '../../ui/CardFooter';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';
import Button from '../../ui/Button';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createListPlugin from 'draft-js-list-plugin';
import { FormattedMessage } from 'react-intl';
import basicTextStylePlugin from '../../editor/plugins/basicTextStylePlugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css'
import PostFormStyle from './styles'

const linkifyPlugin = createLinkifyPlugin();
const listPlugin = createListPlugin();
const hashtagPlugin = createHashtagPlugin();
const plugins = [linkifyPlugin, basicTextStylePlugin, listPlugin, hashtagPlugin];

function PostForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const contentState = editorState.getCurrentContent();
  const [media, setMedia] = useState(null);

  const preview = useMemo(() => (media && media.type === 'image'
    ? URL.createObjectURL(media.data)
    : null), [media]);

  // eslint-disable-next-line no-shadow
  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // eslint-disable-next-line react/no-this-in-sfc
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  function handleSubmit() {
    const note = { content: convertToRaw(contentState) };
    note.content = JSON.stringify(note.content);
    setEditorState(EditorState.createEmpty());
  }

  const handleAddImage = (e) => {
    setMedia({
      type: 'image',
      data: e.target.files[0],
    });
  };

  const handleAddEmbed = () => {
    setMedia({
      type: 'embed',
      data: {
        url: '',
      },
    });
  };

  const handleAddPoll = () => {
    setMedia({
      type: 'poll',
      data: [{ text: '' }, { text: '' }],
    });
  };

  const addPollOption = () => {
    if (media.data.length < 4) {
      setMedia({ ...media, data: [...media.data, { text: '' }] });
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    document.getElementById('image-input').value = null;
  };

  // Determine whether placeholder should be displayed (to avoid overlap with lists)
  const blockType = RichUtils.getCurrentBlockType(editorState);
  const isOl = blockType === 'ordered-list-item';
  const isUl = blockType === 'unordered-list-item';
  const placeholderIsVisible = !isOl && !isUl;

  return (
    <div style={{ width: '100%' }}>
      <PostFormStyle>
        <div className="text-box">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder={
              placeholderIsVisible ? (
                <FormattedMessage id="components.postNewStatus.thinking" />
              ) : (
                ''
              )
            }
            plugins={plugins}
            spellCheck
          />
          {media && (
            <div className="media-preview">
              {media.type === 'image' && (
                <div className="image-box">
                  <IconButton
                    onClick={handleRemoveMedia}
                    className="close-icon"
                  >
                    <CloseIcon />
                  </IconButton>
                  <img src={preview} alt="preview" />
                </div>
              )}
              {media.type === 'poll' && (
                <Card>
                  <div className="poll-box">
                    <ul>
                      {media.data.map((option, index) => (
                        <li>
                          <TextField
                            fullWidth
                            type="text"
                            placeholder={`Opção ${index + 1} ${
                              index >= 2 ? '(opcional)' : ''
                            }`}
                            style={{ marginBottom: 8 }}
                          />
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        minWidth: 56,
                        padding: 10,
                      }}
                    >
                      {media.data.length < 4 && (
                        <IconButton color="secondary" disableElevation>
                          <AddIcon onClick={addPollOption} />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <CardFooter
                    label="Remover Enquete"
                    action={handleRemoveMedia}
                  />
                </Card>
              )}
              {media.type === 'embed' && (
                <Card>
                  <CardBody>
                    <TextField
                      fullWidth
                      placeholder="Link do Vídeo"
                      value={media.data.url}
                      onChange={(e) => setMedia({
                        type: 'embed',
                        data: { url: e.target.value },
                      })}
                    />
                    {media.data.url !== '' && (
                      <ReactPlayer
                        url={media.data.url}
                        light
                        style={{ marginTop: 8 }}
                        width="100%"
                      />
                    )}
                  </CardBody>

                  <CardFooter
                    label="Remover Incorporação"
                    action={handleRemoveMedia}
                  />
                </Card>
              )}
            </div>
          )}
        </div>
        <div className="form-actions">
          <div className="upload-button">
            <label>
              <ImageIcon />
              <input id="image-input" type="file" onChange={handleAddImage} />
            </label>
          </div>
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
            style={{ marginLeft: 'auto' }}
            disabled={!contentState.hasText()}
            onClick={handleSubmit}
          >
            Publicar
          </Button>
        </div>
      </PostFormStyle>
    </div>
  );
}

export default PostForm;
