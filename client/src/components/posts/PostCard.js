import React from "react";
import Paper from "../ui/Paper";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Dropdown from "../../components/ui/Dropdown";
import DropdownListContainer from "../../components/ui/DropdownListContainer";
import DropdownListItem from "../../components/ui/DropdownListItem";
import IconButton from "../../components/ui/IconButton";
import MdMore from "react-ionicons/lib/MdMore";
import CommentBox from '../comments/CommentBox'

// Icons
import LikeIcon from "react-ionicons/lib/IosThumbsUpOutline";
import ShareIcon from "react-ionicons/lib/IosShareAltOutline";
import CommentIcon from "react-ionicons/lib/IosTextOutline";
import DeleteIcon from "react-ionicons/lib/IosRemoveCircleOutline";
import DocumentIcon from "react-ionicons/lib/IosDocumentOutline";

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
    color: ${ props => props.theme.pallete.text.primary};
    line-height: 100%;
    font-size: 1rem;
    margin-bottom: 5px
  }

  span { 
    display: block;
    color: ${ props => props.theme.pallete.text.secondary};
    line-height: 100%;
    font-size: 0.8rem
  }
`;

const PostActions = styled.div`
  display: flex;
  border-top: 1px solid #2f3749;
  background: rgba(0,0,0,.1);

  > button {
    flex: 1;
    padding: 15px;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      display: block;
      margin-left: 10px;
      font-size: 1.1em;
    }

    > svg { 
      fill: white;
    }

    &:hover {
      background: rgba(256,256,256,0.02);
    }
  }
`;

const PostCard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleCommentBox = () => {
    setExpanded(!expanded)
  }

  return (
    <Paper style={{ marginTop: 15 }}>
      <PostCardHeader>
        <ProfilePicture>
          <img src={defaultProfilePicture} alt="Default profile pic" />
        </ProfilePicture>
        <div>
          <Link to="/user">Nome do Usuário </Link>
          <span>há poucos segundos</span>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Dropdown offsetX={15} placement="left-start" toggle={<IconButton><MdMore color="#fff" fontSize="24px" /></IconButton>}>
            <DropdownListContainer>
              <DropdownListItem icon={<DocumentIcon />} onClick={() => alert("foo")}>Edit</DropdownListItem>
              <DropdownListItem icon={<DeleteIcon />}>Delete</DropdownListItem>
            </DropdownListContainer>
          </Dropdown>
        </div>
      </PostCardHeader>

      <div style={{ padding: 20 }}>
        Culpa dolor consectetur mollit est qui aliquip adipisicing velit commodo aliquip culpa non eu veniam. Pariatur ut est et qui fugiat nulla. Sunt laboris excepteur fugiat deserunt et mollit cillum quis duis ea. Cupidatat sint incididunt aliqua non cupidatat commodo irure ad non. Adipisicing elit et magna sit sit sit laboris. Labore veniam ipsum consectetur minim.
        Ad voluptate cupidatat aliqua occaecat. Mollit exercitation est eu est id ipsum excepteur mollit eiusmod incididunt. Et qui qui ut magna laborum duis voluptate proident amet cupidatat duis exercitation mollit. Officia adipisicing cillum magna exercitation. Cupidatat ullamco reprehenderit excepteur ipsum nostrud Lorem culpa nostrud labore dolore.
      </div>

      <PostActions>
        <button>
          <LikeIcon />
          <span>1</span>
        </button>
        <button onClick={handleCommentBox}>
          <CommentIcon />
          <span>1</span>
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
