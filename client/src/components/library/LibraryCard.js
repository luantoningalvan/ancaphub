import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BookmarkButton from './BookmarkButton.js'

import BookIcon from "react-ionicons/lib/IosBook";
import VideoIcon from "react-ionicons/lib/IosVideocam";
import ArticleIcon from "react-ionicons/lib/IosPaper";

import defaultBookCover from "../../assets/default-book-cover.jpg";
import defaultArticleCover from "../../assets/default-article-cover.jpg";
import defaultVideoCover from "../../assets/default-video-cover.jpg";


const types = {
  book: {
    icon: <BookIcon />,
    defaulCover: defaultBookCover,
    size: 280
  },
  article: {
    icon: <ArticleIcon />,
    defaulCover: defaultArticleCover,
    size: 200
  },
  video: {
    icon: <VideoIcon />,
    defaulCover: defaultVideoCover,
    size:130
  }
}

const LibraryCard = styled.div`
  padding-top:10px;
  width: 100%;

  .card-cover {
    width: 100%;
    border-radius: 16px;
    height: ${props => types[props.type].size}px ;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: opacity 0.4s ease;

    .card-buttons,
    .card-image{
      position: absolute;
      text-decoration: none;
    }

    .card-buttons {
      display: none;
    };

    .card-image{
      width:100%;
      border-radius: 16px;
      height: ${props => types[props.type].size}px ;
      overflow: hidden;

      img {  
        width:100%;
        height:100%;
        object-fit: cover;
      }

      &:before {
        content: "";
        transition: all 0.4s;
      }
    }

    &:hover {
      > .card-buttons {
        display: block;
      }

      .card-image {
        &:before {
          width: 100%;
          height: ${props => types[props.type].size}px ;
          background: linear-gradient(to bottom, rgba(0,0,0,.3) 0%,rgba(0,0,0,1) 100%);
          content: "";
          position: absolute;
          border-radius: 16px;
        }
      }
    }
  }

  .card-title {
    margin: 10px 0px 0px;
    padding: 0px;
    line-height: 1.25rem;
    font-size: 1.25rem;
    margin: 15px 0px 5px;
    color: ${(props) => props.theme.palette.text.primary};
  }

  .card-author {
    font-weight: lighter;
    margin: 0;
    line-height: 0.9rem;
    font-size: 0.9rem;
    color: ${(props) => props.theme.palette.text.secondary};
  }

  .card-type{
    position: absolute;
    top: -10px;
    background: ${(props) => props.theme.palette.secondary};
    padding: 5px;
    border-radius: 5px;
    line-height: 100%;
    z-index:10;
    left: 10px;
    > svg {
      fill: ${(props) => props.theme.palette.text.contrast};
    }
  }

  .link{
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration: none;
  }
`;

const ItemCard = ({ item }) => (
  <LibraryCard type={item.type}>
    <div className="card-cover">
      <div className="card-type">
        {types[item.type].icon}
      </div>
      <Link to={`/library/${item.type}s/${item._id}`} className="card-image">
        <img
          src={item.cover && item.cover.url ? item.cover.url : types[item.type].defaulCover}
        />
      </Link>

      <div className="card-buttons"><BookmarkButton /></div>
    </div>

    <Link to={`/library/${item.type}s/${item._id}`} className="link">
      <h2 className="card-title">{item.title}</h2>
    </Link>

    <h2 className="card-author">{item.author}</h2>
  </LibraryCard>
);

export default ItemCard;
