import React, { useState } from 'react';
import styled from 'styled-components';
import MdMore from 'react-ionicons/lib/MdMore';
import DeleteIcon from 'react-ionicons/lib/IosRemoveCircleOutline';
import DocumentIcon from 'react-ionicons/lib/IosDocumentOutline';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedRelativeTime } from 'react-intl';
import { differenceInSeconds, parseISO, getTime } from 'date-fns';
import UserAvatar from '../users/UserAvatar';
import UserName from '../users/UserName';
import Dropdown from '../ui/Dropdown';
import DropdownListContainer from '../ui/DropdownListContainer';
import DropdownListItem from '../ui/DropdownListItem';
import IconButton from '../ui/IconButton';
import CommentBox from './CommentBox';
import { deleteCommentRequest, likeCommentRequest } from '../../actions/comments';
import Confirm from '../ui/Confirm';

const SingleCommentStyle = styled.div`
  .teste {
    display: flex;
    align-items: stretch;
    margin-bottom: 10px;
  }

  .comment-content {
    background: rgba(0, 0, 0, 0.05);
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }

  .comment-text {
    padding-top: 3px;
    margin: 0;
    text-align: left;
    font-size: 0.92em;
  }

  .date {
    font-size: 0.7em;
    margin-top: 8px;

    li {
      list-style: none;
      display: inline-block;
      &:after {
        content: "·";
        margin: 0px 5px;
      }

      &:last-child {
        &:after {
          content: "";
          margin: 0;
        }
      }
    }

    a {
      color: ${(props) => props.theme.palette.text.secondary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;

    svg {
      fill: ${(props) => props.theme.palette.text.secondary};
      height: 20px;
      width: 20px;
    }
  }
`;

const SingleComment = ({ comment, post }) => {
  const [responsesState, setResponsesState] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user._id);

  const handleResponse = () => {
    setResponsesState(!responsesState);
  };

  const handleDelete = () => {
    dispatch(deleteCommentRequest(post, comment._id));
    setDeleteBox(false);
  };

  const handleLikeComment = () => {
    dispatch(likeCommentRequest(comment._id));
  };

  return (
    <SingleCommentStyle>
      <div className="teste">
        <UserAvatar user={comment.user} style={{ marginRight: 8 }} />
        <div className="comment-content">
          <UserName user={comment.user} fontSize={1} />
          <p className="comment-text">{` ${comment.content}`}</p>
          <ul className="date">
            {/*
            <li>
              <a href="#" onClick={handleLikeComment}>Curtir</a>
            </li>
            <li>
              <a role="presentation" onClick={handleResponse}>
                Responder
              </a>
            </li>
            */}
            <li>
              <a>
                <FormattedRelativeTime
                  numeric="auto"
                  value={
                  -differenceInSeconds(
                    Date.now(),
                    getTime(parseISO(comment.date)),
                  )
                }
                  updateIntervalInSeconds={30}
                />
              </a>
            </li>
          </ul>
        </div>
        {auth && auth === comment.user._id && (
        <div className="actions">
          <Dropdown
            placement="left-start"
            toggle={(
              <IconButton>
                <MdMore />
              </IconButton>
          )}
          >
            <DropdownListContainer>
              {/* <DropdownListItem icon={<DocumentIcon />}>Edit</DropdownListItem> */}
              <DropdownListItem icon={<DeleteIcon />} onClick={() => setDeleteBox(true)}>Delete</DropdownListItem>
            </DropdownListContainer>
          </Dropdown>
          <Confirm
            show={deleteBox}
            onClose={() => setDeleteBox(false)}
            onConfirm={handleDelete}
            title="Deletar comentário?"
            message="Realmente deseja deletar seu comentário?"
          />
        </div>
        )}

      </div>
      <CommentBox expanded={responsesState} indent />

    </SingleCommentStyle>
  );
};

export default SingleComment;
