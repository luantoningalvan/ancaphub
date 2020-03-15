import React from "react";
import Paper from "../../../components/ui/Paper";
import Container from "../../../components/ui/Container";
import defaultThumbnail from "../../../assets/default-book-cover.jpg";
import styled from "styled-components";
//import parse from "html-react-parser";
//import Categories from "../../../components/categories/showElementCategories";
//import LoadContent from "../../../components/loaders/loadContent"
//import UnavaliableContent from "../../../components/error/unavaliableContent"
//import InvitedBy from "../../../components/profile/invitedBy"

const Banner = styled.div`
  background: url(${props => (props.cover ? props.cover : defaultThumbnail)}) rgba(0, 0, 0, 0.8);
  background-size: cover;
  background-position: center;
  width: 100%;
  background-blend-mode: overlay;
  padding: 96px 0px;
  text-align: center;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${props => props.theme.pallete.text.primary};
  font-size: 2.125rem;
  margin-bottom: 5px;
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${props => props.theme.pallete.text.secondary};
  font-size: 1.25rem;
`;

const SingleArticle = () => {
  return true ? (
    <>
      <Banner>
        <Container>
          {/*<Categories categories={categories} />*/}
          Categories
          <Title>Título</Title>
          <Author>Autor</Author>
        </Container>
      </Banner>

      <div style={{marginTop: -20}}>
      <Container>
        <Paper padding>
          {/*parse(`${content}`)*/}
          Conteúdo
        </Paper>
        InvitedBy
        {/*<InvitedBy user={user} />*/}
      </Container>
      </div>
    </>
  ) : (
    <Container>
      <div mt={2}>
        UnavaliableContent
        {/*<UnavaliableContent />*/}
      </div>
    </Container>
  );
};

export default SingleArticle;
