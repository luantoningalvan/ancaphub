import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedRelativeTime } from "react-intl";
import { parseISO, getTime, differenceInSeconds } from "date-fns";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import ReactPlayer from "react-player";
import MdMore from "react-ionicons/lib/MdMore";
import LikeIcon from "react-ionicons/lib/IosThumbsUpOutline";
import LikeIconFull from "react-ionicons/lib/IosThumbsUp";
//import ShareIcon from 'react-ionicons/lib/IosShareAltOutline';
import CommentIcon from "react-ionicons/lib/IosTextOutline";
import DeleteIcon from "react-ionicons/lib/IosRemoveCircleOutline";
import CommentBox from "../comments/CommentBox";
import IconButton from "../ui/IconButton";
import DropdownListItem from "../ui/DropdownListItem";
import DropdownListContainer from "../ui/DropdownListContainer";
import Dropdown from "../ui/Dropdown";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";
import Paper from "../ui/Paper";
import ImageBox from "../../components/ui/ImageBox";
import LikeBox from "./LikeBox";
import Confirm from "../../components/ui/Confirm";
import { PostContainer } from "./styles.css";
import { useDispatch } from "react-redux";
import { likePostRequest } from "../../actions/posts";

const PostCard = ({ data }) => {
  const dispatch = useDispatch();

  const [commentBoxState, setCommenteBoxState] = useState(false);
  const [likeBoxState, setLikeBoxState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);

  const handleCommentBox = () => setCommenteBoxState(!commentBoxState);
  const handleDelete = () => setDeleteDialogState(!deleteDialogState);

  // For displaying post
  const contentState = convertFromRaw(JSON.parse(data.content));
  const editorState = EditorState.createWithContent(contentState);

  const handleLikePost = (id) => {
    dispatch(likePostRequest(id));
  };

  return (
    <>
      <Confirm
        show={deleteDialogState}
        onClose={handleDelete}
        onConfirm={() => {}}
        title="Deletar postagem?"
        message="Você tem certeza que deseja deletar a postagem?"
      />

      <PostContainer>
        <div className="post-header">
          <div className="profile-picture">
            <img
              src={data.user.avatar ? data.user.avatar : defaultProfilePicture}
              alt="Default profile pic"
            />
          </div>
          <div>
            <Link to={`/${data.user._id}`}>{data.user.name}</Link>
            <span>
              <FormattedRelativeTime
                value={
                  -differenceInSeconds(
                    Date.now(),
                    getTime(parseISO(data.createdAt))
                  )
                }
                updateIntervalInSeconds={30}
              />
            </span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Dropdown
              offsetX={15}
              placement="left-start"
              toggle={
                <IconButton>
                  <MdMore color="#fff" fontSize="24px" />
                </IconButton>
              }
            >
              <DropdownListContainer>
                <DropdownListItem icon={<DeleteIcon />} onClick={handleDelete}>
                  Deletar
                </DropdownListItem>
              </DropdownListContainer>
            </Dropdown>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {/* Show post content  */}
          <Editor editorState={editorState} readOnly />
          {/* If post has embed media type */}
          {(data.media && data.media.mediaType) === "embed" && (
            <ReactPlayer
              url={data.media.data}
              light
              style={{ marginTop: 16 }}
              width="100%"
            />
          )}

          {data.media && data.media.mediaType === "image" && (
            <ImageBox src={data.media.data} />
          )}

          {data.likeCount > 0 && (
            <div className="post-counts">
              <span onClick={() => setLikeBoxState(true)}>
                {data.likeCount + (data.likeCount > 1 ? " curtidas" : " curtida")}
              </span>
              <LikeBox 
                open={likeBoxState}
                onClose={() => setLikeBoxState(false)}
                postId={data._id}
              />
            </div>
          )}
        </div>

        <div className="post-actions">
          <div>
            <button onClick={() => handleLikePost(data._id)} className={data.hasLiked ? "pressed" : ""}>
              {data.hasLiked ? (
                <LikeIconFull />
              ) : (
                <LikeIcon />
              )}
              <span>Curtir</span>
            </button>
          </div>
          <div>
            <button onClick={handleCommentBox}>
              <CommentIcon />
              <span>Comentar</span>
            </button>
          </div>
          {/* 
        <div>
        <button disabled>
          <ShareIcon />
          <span>Compartilhar</span>
        </button>
        </div>
        */}
        </div>
        <CommentBox expanded={commentBoxState} post={data._id} />
      </PostContainer>
    </>
  );
};

export default PostCard;
