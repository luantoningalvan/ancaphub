import React from "react";
import VideoIcon from "react-ionicons/lib/IosVideocam";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import defaultVideoCover from "../../../assets/default-video-cover.jpg";

const CardCover = styled.div`
  width: 100%;
  border-radius: 16px;
  height: 130px;
  background: url("${props => props.cover}");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: opacity 0.4s ease;
  > .card-buttons {
    display: none;
  };
  &::before {
    transition: opacity 0.4s ease;
    opacity: 0;
  };
  
  &:hover {
    background-size: scale(1.1);
    > .card-buttons {
      display: block;
    }
    &::before {
      width: 100%;
      height: 130px;
      background: linear-gradient(to bottom, rgba(0,0,0,.4) 0%,rgba(0,0,0,1) 100%);
      content: "";
      position:absolute;
      opacity: 0.7;
      border-radius: 16px;
  }
}
`;

const Link = styled(RouterLink)`
  color: ${props => props.theme.palette.text.primary};
  text-decoration: none;
`;

const CardTitle = styled.h2`
  margin: 10px 0px 0px;
  padding: 0px;
  line-height: 1.25rem;
  font-size: 1.25rem;
  margin: 15px 0px 5px;
  color: ${props => props.theme.palette.text.primary};
`;
const CardSubtitle = styled.h3`
  font-weight: lighter;
  margin: 0;
  line-height: 0.9rem;
  font-size: 0.9rem;
  color: ${props => props.theme.palette.text.secondary};
`;

const CardType = styled.span`
  position: absolute;
  top: -10px;
  background: ${props => props.theme.palette.secondary};
  padding: 5px;
  border-radius: 5px;
  line-height: 100%;
  left: 10px;
  > svg {
    fill: ${props => props.theme.palette.text.contrast};
  }
`;
export default function VideoCard(props) {
  return (
    <div>
      <Link to={`/videos/id`}>
        <CardCover cover={defaultVideoCover}>
          <CardType>
            <VideoIcon />
          </CardType>
          <div class="card-buttons">Botões</div>
        </CardCover>
      </Link>

      <Link to={`/videos/id`}>
        <CardTitle>Título do Vídeo</CardTitle>
      </Link>

      <CardSubtitle variant="subtitle1">Autor do Vídeo</CardSubtitle>
    </div>
  );
}
