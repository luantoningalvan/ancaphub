import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedRelativeTime } from 'react-intl';
import { parseISO, getTime, differenceInSeconds } from 'date-fns';

// Functional stuff
import ReactPlayer from 'react-player';

// Icons
import MdMore from 'react-ionicons/lib/MdMore';
import LikeIcon from 'react-ionicons/lib/IosThumbsUpOutline';
import ShareIcon from 'react-ionicons/lib/IosShareAltOutline';
import CommentIcon from 'react-ionicons/lib/IosTextOutline';
import DeleteIcon from 'react-ionicons/lib/IosRemoveCircleOutline';
import DocumentIcon from 'react-ionicons/lib/IosDocumentOutline';
import CommentBox from '../comments/CommentBox';
import IconButton from '../ui/IconButton';
import DropdownListItem from '../ui/DropdownListItem';
import DropdownListContainer from '../ui/DropdownListContainer';
import Dropdown from '../ui/Dropdown';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';
import Paper from '../ui/Paper';

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

  > button {
    flex: 1;
    padding: 15px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme.palette.text.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;

    > span {
      display: block;
      margin-left: 10px;
      font-size: 1.1em;
    }

    > svg { 
      fill: ${(props) => props.theme.palette.text.secondary};
    }

    &:hover {
      color: ${(props) => props.theme.palette.primary};
      
    > svg { 
      fill: ${(props) => props.theme.palette.primary};
    }
    }
  }
`;

const PostCard = ({ data }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleCommentBox = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper style={{ marginTop: 15, flexGrow: 1 }}>
      <PostCardHeader>
        <ProfilePicture>
          <img src={defaultProfilePicture} alt="Default profile pic" />
        </ProfilePicture>
        <div>
          <Link to="/user">{data.user.name}</Link>
          <span>
            <FormattedRelativeTime value={-differenceInSeconds(Date.now(), getTime(parseISO(data.createdAt)))} updateIntervalInSeconds={30} />
          </span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Dropdown offsetX={15} placement="left-start" toggle={<IconButton><MdMore color="#fff" fontSize="24px" /></IconButton>}>
            <DropdownListContainer>
              <DropdownListItem icon={<DocumentIcon />}>Edit</DropdownListItem>
              <DropdownListItem icon={<DeleteIcon />}>Delete</DropdownListItem>
            </DropdownListContainer>
          </Dropdown>
        </div>
      </PostCardHeader>

      <div style={{ padding: 20 }}>
        {data.content}
        {(data.media && data.media.mediaType) === 'embed' && (
          <ReactPlayer
            url={data.media.data}
            light
            style={{ marginTop: 15 }}
            width="100%"
          />
        )}
      </div>

      <PostActions>
        <button>
          <LikeIcon />
          <span>{data.likes.length}</span>
        </button>
        <button onClick={handleCommentBox}>
          <CommentIcon />
          <span>{data.comments.length}</span>
        </button>
        <button>
          <ShareIcon />
          <span>1</span>
        </button>
      </PostActions>
      <CommentBox expanded={expanded} post={1} />
    </Paper>
  );
};

export default PostCard;
