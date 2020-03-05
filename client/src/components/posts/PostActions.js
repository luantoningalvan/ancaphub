import React from 'react';
import styled from 'styled-components'

// Icons
import LikeIcon from 'react-ionicons/lib/IosThumbsUpOutline'
import CommentIcon from 'react-ionicons/lib/IosShareAltOutline'
import ShareIcon from 'react-ionicons/lib/IosTextOutline'

const PostActionStyled = styled.div`
  display: flex;
  border-top:1px solid #2f3749;
  background: rgba(0,0,0,.1);

  > button {
    flex: 1;
    padding:15px;
    border:none;
    outline:none;
    background:transparent;
    cursor: pointer;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;

    > span {
      display:block;
      margin-left: 10px;
      font-size: 1.1em;
    }

    > svg { 
      fill: white;
    }

    &:hover {
      background: rgba(256,256,256,0.02)
    }
  }
`

const PostActions = () => {
    return (
      <PostActionStyled>
        <button>
          <LikeIcon />
          <span>1</span>
        </button>
        <button>
          <CommentIcon />
          <span>1</span>
        </button>
        <button>
          <ShareIcon />
          <span>1</span>
        </button>
      </PostActionStyled>
    )
}

export default PostActions