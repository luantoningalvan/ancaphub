import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedRelativeTime } from 'react-intl';
import { parseISO, getTime, differenceInSeconds } from 'date-fns';

// Functional stuff
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import ReactPlayer from 'react-player';

// Icons
import MdMore from 'react-ionicons/lib/MdMore';
import LikeIcon from 'react-ionicons/lib/IosThumbsUpOutline';
import ShareIcon from 'react-ionicons/lib/IosShareAltOutline';
import CommentIcon from 'react-ionicons/lib/IosTextOutline';
import DeleteIcon from 'react-ionicons/lib/IosRemoveCircleOutline';
import CommentBox from '../comments/CommentBox';
import IconButton from '../ui/IconButton';
import DropdownListItem from '../ui/DropdownListItem';
import DropdownListContainer from '../ui/DropdownListContainer';
import Dropdown from '../ui/Dropdown';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import Paper from '../ui/Paper';
import ImageBox from '../../components/ui/ImageBox';
import Confirm from '../../components/ui/Confirm';

const ProfilePicture = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 10px;
  > img {
    width: 100%;
  }
`;

const PostCardHeader = styled.div`
  display: flex;
  padding: 20px 20px 0px;
  align-items: center;

  a { 
    display: block; 
    text-decoration: none;
    font-weight: bold;
    color: ${(props) => props.theme.palette.text.primary};
    line-height: 100%;
    font-size: 1rem;
    margin-bottom: 5px
  }

  span { 
    display: block;
    color: ${(props) => props.theme.palette.text.secondary};
    line-height: 100%;
    font-size: 0.8rem
  }
`;

const PostActions = styled.div`
  display: flex;
  border-top: 1px solid ${(props) => props.theme.palette.border};
  background: ${(props) => props.theme.palette.paperDark};

  div { 
    align-items: center;
    display: flex;
    flex: 1 0 0px;
    justify-content: center;
  }

  button {
    margin: 8px;
    padding: 8px;
    border: none;
    outline: none;
    display:block;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme.palette.text.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    width: 100%;
    
    > span {
      font-size: 1.1em;
    }

    > svg { 
      fill: ${(props) => props.theme.palette.text.primary};
      margin-right: 8px;
    }

    &:hover {
      background: rgba(0,0,0,0.1);
    }
  }
`;

const PostCard = ({ data }) => {
  const [commentBoxState, setCommenteBoxState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);

  const handleCommentBox = () => setCommenteBoxState(!commentBoxState);
  const handleDelete = () => setDeleteDialogState(!deleteDialogState)

  // For displaying post
  const contentState = convertFromRaw(JSON.parse(data.content));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <>
    <Confirm 
      show={deleteDialogState} 
      onClose={handleDelete} 
      onConfirm={() => {}} 
      title="Deletar postagem?"
      message="Você tem certeza que deseja deletar a postagem?"
    />

    <Paper style={{ marginTop: 15, flexBasis: '100%' }}>
      <PostCardHeader>
        <ProfilePicture>
          <img src={data.user.avatar ? data.user.avatar : defaultProfilePicture} alt="Default profile pic" />
        </ProfilePicture>
        <div>
          <Link to={`/${data.user._id}`}>{data.user.name}</Link>
          <span>
            <FormattedRelativeTime value={-differenceInSeconds(Date.now(), getTime(parseISO(data.createdAt)))} updateIntervalInSeconds={30} />
          </span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Dropdown offsetX={15} placement="left-start" toggle={<IconButton><MdMore color="#fff" fontSize="24px" /></IconButton>}>
            <DropdownListContainer>
              <DropdownListItem icon={<DeleteIcon />} onClick={handleDelete}>Deletar</DropdownListItem>
            </DropdownListContainer>
          </Dropdown>
        </div>
      </PostCardHeader>

      <div style={{ padding: 20 }}>
        { /* Show post content  */ }
        <Editor editorState={editorState} readOnly />
        { /* If post has embed media type */ }
        {(data.media && data.media.mediaType) === 'embed' && (
          <ReactPlayer
            url={data.media.data}
            light
            style={{ marginTop: 16 }}
            width="100%"
          />
        )}

        {(data.media && data.media.mediaType === 'image') && (
          <ImageBox src={data.media.data} />
        )}
      </div>

      <PostActions>
        <div>
        <button>
          <LikeIcon />
          <span>Curtir</span>
        </button>
        </div>
        <div>
        <button onClick={handleCommentBox}>
          <CommentIcon />
          <span>Comentar</span>
        </button>
        </div>
        <div>
        <button disabled>
          <ShareIcon />
          <span>Compartilhar</span>
        </button>
        </div>
      </PostActions>
      <CommentBox expanded={commentBoxState} post={1} />
    </Paper>
    </>
  );
};

export default PostCard;
