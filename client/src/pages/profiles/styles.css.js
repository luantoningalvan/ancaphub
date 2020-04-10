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
  > img {
    height: 128px;
    width: 128px;
    border-radius: 100%;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  > .follower-count,
  .user-name,
  .user-action-buttons {
    flex: 1;
    display: flex;
  }

  > .follower-count {
    justify-content: flex-start;

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

  > .user-name {
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

  > .user-action-buttons {
    justify-content: flex-end;

    > button {
      margin-left: 10px;
    }
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

export const Tabs = styled.ul`
  display: flex;

  > li {
    list-style: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme.palette.border};
    }
  }

  > li.current {
    border-bottom: 3px solid ${(props) => props.theme.palette.secondary};
  }
  > li a {
    display: block;
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration: none;
    padding: 16px 32px;
  }
`;