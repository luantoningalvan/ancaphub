import React from "react";
import Paper from "../ui/Paper";
import PostActions from "./PostActions";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom" ;

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
    color: ${ props => props.theme.pallete.text.primary };
    line-height: 100%;
    font-size: 1rem;
    margin-bottom: 5px
  }

  span { 
    display: block;
    color: ${ props => props.theme.pallete.text.secondary };
    line-height: 100%;
    font-size: 0.8rem
  }
`;

const PostCard = () => {
  return (
    <Paper style={{ marginTop: 15 }}>
      <PostCardHeader>
        <ProfilePicture>
          <img src={defaultProfilePicture} />
        </ProfilePicture>
        <div>
        <Link to="/user">Nome do Usuário </Link>
        <span>há poucos segundos</span>
        </div>
      </PostCardHeader>

      <div style={{padding:20}}>
        Culpa dolor consectetur mollit est qui aliquip adipisicing velit commodo aliquip culpa non eu veniam. Pariatur ut est et qui fugiat nulla. Sunt laboris excepteur fugiat deserunt et mollit cillum quis duis ea. Cupidatat sint incididunt aliqua non cupidatat commodo irure ad non. Adipisicing elit et magna sit sit sit laboris. Labore veniam ipsum consectetur minim.
        Ad voluptate cupidatat aliqua occaecat. Mollit exercitation est eu est id ipsum excepteur mollit eiusmod incididunt. Et qui qui ut magna laborum duis voluptate proident amet cupidatat duis exercitation mollit. Officia adipisicing cillum magna exercitation. Cupidatat ullamco reprehenderit excepteur ipsum nostrud Lorem culpa nostrud labore dolore.
      </div>

      <PostActions />
    </Paper>
  );
};

export default PostCard;
