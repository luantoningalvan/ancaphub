import styled from 'styled-components';

export const ProfileHeader = styled.div`
  width: 100%;
  background: ${(props) => props.theme.palette.paper};
  border-radius: 10px;
  margin-top: 15px;
  overflow: hidden;
`;

export const ProfileCover = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const ProfilePicture = styled.div`
  margin-top: -100px;
  display: flex;
  justify-content: center;

  .avatar {
    position:relative;
    height: 128px;
    width: 128px;
    border-radius: 100%;
    overflow:hidden;
    cursor:pointer;

    img {
      height: 100%;
      width: 100%;
    }

    ${(props) => props.isOwn && `
    &:before {
      content: "";
      transition: all 0.3s;
    }

    .edit-profile-picture {
      display:none;
      position: absolute;
      height:64px;
      width:64px;
      top: 32px;
      left: 32px;
      align-items:center;
      justify-content:center;

      svg {
        fill: ${props.theme.palette.text.contrast};
        height:32px;
        width:32px;
      }
    }

    &:hover {
      .edit-profile-picture {
        display:flex;
      }

      &:before {
        content: "";
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        position:absolute
      }
    }
    `}
  }

`;

export const ProfileInfo = styled.div`
  display: grid;
  grid-template-areas: "userName" "followerCount" "userActions";
  padding: 16px;

  .follower-count,
  .user-name,
  .user-action-buttons {
    flex: 1;
    display: flex;
  }

  .follower-count {
    justify-content: center;
    grid-area: followerCount;
    margin: 16px 0px;
    > ul {
      margin: 0;
      padding: 0;
      display: flex;

      > li {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 0 25px;
        font-size: 0.75rem;
        text-transform: uppercase;

        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 20px;
          background-color: ${(props) => props.theme.palette.border};
          position: absolute;
          top: 8px;
          right: 0;
        }

        &:first-child {
          padding-left: 0px;
        }
        &:last-child {
          &::after {
            display: none;
          }
        }

        > span {
          color: ${(props) => props.theme.palette.text.secondary};
        }
        > .counter {
          text-decoration: none;
          font-weight: bold;
          font-size: 1.375rem;
          color: ${(props) => props.theme.palette.text.primary};
          margin-bottom: 8px;
        }
      }
    }
  }

  .user-name {
    grid-area: userName;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > h3 {
      font-size: 1.3rem;
      margin-bottom: 5px;
      color: ${(props) => props.theme.palette.text.primary};

    }
    > span {
      font-size: 0.9rem;
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }

  .user-action-buttons {
    grid-area: userActions;
    justify-content: center;

    button { 
      width:100%; 
      flex:1;
      margin-right:16px;
    }

    button:last-child {margin:0px}
  }
`;

export const UserAbout = styled.div`
  width: 100%;
  > p {
    margin: 10px 0px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > ul li {
    list-style: none;
    margin: 10px 0px;
  }
  > ul li a {
    color: ${(props) => props.theme.palette.text.primary};
  }
  > ul li svg {
    float: left;
    fill: ${(props) => props.theme.palette.text.primary};
    margin-right: 10px;
  }
`;
