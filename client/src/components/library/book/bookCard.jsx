import React from 'react';
import { Book as BookIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import defaultThumbnail from '../../../assets/images/default-thumbnail.jpg'
import AddToLibrary from '../addToLibrary';
import AddBookmark from '../addBookmark';
import styled from 'styled-components'

const CardCover = styled.div`
  width: 100%;
  border-radius: 16px;
  height: 280px;
  background: url("${props => props.cover}");
  background-position:center;
  background-size: cover;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  display:flex;
  align-items:center;
  justify-content: center;
  position:relative;
  transition: opacity 0.4s ease;

  > .card-buttons {
    display:none
  };

  &::before {
    transition: opacity 0.4s ease;
    opacity: 0
  };
  
  &:hover {
    background-size: scale(1.1);

    > .card-buttons {
      display:block
    }

    &::before {
      width:100%;
      height:280px;
      background: linear-gradient(to bottom, rgba(0,0,0,.4) 0%,rgba(0,0,0,1) 100%);
      content: "";
      position:absolute;
      opacity: 0.7;
      border-radius: 16px;
  }
}
`

const Link = styled(RouterLink)`
  color: rgba(0,0,0,0.6);
  text-decoration: none;  
`

const CardTitle = styled.h2`
  margin: 10px 0px 0px;
  padding:0px,
  font-size:1em
`
const CardSubtitle = styled.h3`
  font-weight: lighter;
  margin:0
`

const CardType = styled.span`
  position:absolute;
  top: -10px;
  background: #fb0;
  color:white;
  padding:5px;
  border-radius:5px;
  line-height:100%;
  left: 10px;
  font-size:10px
`


export default function BookCard(props) {
  const { book } = props;
  const { _id, cover, title, author, hasSaved, inLibrary } = book

  return (
    <div>
      <Link to={`/books/${_id}`}>
        <CardCover cover={cover ? cover.url : defaultThumbnail}>
          <CardType><BookIcon /></CardType>
          <div class="card-buttons">
          <AddToLibrary item={{ _id, inLibrary, location: props.location }} />
          <AddBookmark item={{ _id, hasSaved, location: props.location }} />
          </div>
        </CardCover>
      </Link>

        <Link to={`/books/${_id}`}>
          <CardTitle>
          {title}
          </CardTitle>
        </Link>

      <CardSubtitle variant="subtitle1">{author}</CardSubtitle>
    </div>
  );
}
