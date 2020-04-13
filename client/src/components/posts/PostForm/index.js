import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import ImageIcon from 'react-ionicons/lib/IosImageOutline';
import EmbedIcon from 'react-ionicons/lib/IosCode';
import PollIcon from 'react-ionicons/lib/IosPodiumOutline';
import CloseIcon from 'react-ionicons/lib/IosClose';
import AddIcon from 'react-ionicons/lib/IosAdd';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createListPlugin from 'draft-js-list-plugin';
import { FormattedMessage } from 'react-intl';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';

import { bindActionCreators } from 'redux';
import TextField from '../../ui/TextField';
import CardBody from '../../ui/CardBody';
import CardFooter from '../../ui/CardFooter';
import Card from '../../ui/Card';
import IconButton from '../../ui/IconButton';
import Button from '../../ui/Button';
import basicTextStylePlugin from '../../editor/plugins/basicTextStylePlugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import { createPostRequest, getPostsRequest, getUserPostsRequest } from '../../../actions/posts';
import PostFormStyle from './styles';

const linkifyPlugin = createLinkifyPlugin();
const listPlugin = createListPlugin();
const hashtagPlugin = createHashtagPlugin();
const plugins = [linkifyPlugin, basicTextStylePlugin, listPlugin, hashtagPlugin];

function PostForm({ createPostRequest: createPost }) {
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
    let data;
    const content = JSON.stringify(convertToRaw(contentState));

    if (media !== null) {
      if (media.type === 'image') {
        data = new FormData();
        data.append('content', content);
        data.append('mediaType', media.type);
        data.append('file', media.data);
      } else {
        data = {
          content,
          mediaType: media.type,
          media: media.data,
        };
      }
    } else {
      data = { content };
    }

    createPost(data);
    setMedia(null);
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
      data: '',
    });
  };

  const handleAddPoll = () => {
    setMedia({
      type: 'poll',
      data: ['', ''],
    });
  };

  const addPollOption = () => {
    if (media.data.length < 4) {
      setMedia({ ...media, data: [...media.data, ''] });
    }
  };

  const handleChangePollOption = (index, e) => {
    const newArray = [...media.data];
    newArray[index] = e.target.value;
    setMedia({ ...media, data: newArray });
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
                            value={media.data[index]}
                            style={{ marginBottom: 8 }}
                            onChange={(e) => handleChangePollOption(index, e)}
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
                      value={media.data}
                      onChange={(e) => setMedia({
                        type: 'embed',
                        data: e.target.value,
                      })}
                    />
                    {media.data !== '' && (
                      <ReactPlayer
                        url={media.data}
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
              <input id="image-input" type="file" onChange={(e) => handleAddImage(e)} />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ createPostRequest, getUserPostsRequest, getPostsRequest }, dispatch);
export default connect(null, mapDispatchToProps)(PostForm);
