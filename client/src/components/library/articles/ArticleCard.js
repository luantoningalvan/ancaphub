import React from "react";
import ArticleIcon from "react-ionicons/lib/IosPaper";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import defaultArticleCover from "../../../assets/default-article-cover.jpg";

const CardCover = styled.div`
  width: 100%;
  border-radius: 16px;
  height: 200px;
  background: url("${props => props.cover}");
  background-position: center;
  background-size: cover;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
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
      display: block
    }
    &::before {
      width: 100%;
      height: 200px;
      background: linear-gradient(to bottom, rgba(0,0,0,.4) 0%,rgba(0,0,0,1) 100%);
      content: "";
      position: absolute;
      opacity: 0.7;
      border-radius: 16px;
  }
}
`;

const Link = styled(RouterLink)`
  color: ${props => props.theme.pallete.text.primary};
  text-decoration: none;
`;

const CardTitle = styled.h2`
  margin: 10px 0px 0px;
  padding: 0px;
  line-height: 1.25rem;
  font-size: 1.25rem;
  margin: 15px 0px 5px;
`;
const CardSubtitle = styled.h3`
  font-weight: lighter;
  margin: 0;
  line-height: 0.9rem;
  font-size: 0.9rem;
`;

const CardType = styled.span`
  position: absolute;
  top: -10px;
  background: ${props => props.theme.pallete.secondary};
  padding: 5px;
  border-radius: 5px;
  line-height: 100%;
  left: 10px;
  > svg {
    fill: ${props => props.theme.pallete.text.primary};
  }
`;
export default function VideoCard(props) {
  return (
    <div>
      <Link to={`/articles/id`}>
        <CardCover cover={defaultArticleCover}>
          <CardType>
            <ArticleIcon />
          </CardType>
          <div class="card-buttons">Botões</div>
        </CardCover>
      </Link>

      <Link to={`/articles/id`}>
        <CardTitle>Título do Artigo</CardTitle>
      </Link>

      <CardSubtitle variant="subtitle1">Autor do Artigo</CardSubtitle>
    </div>
  );
}
