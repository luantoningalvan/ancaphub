import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Container from '../../../components/ui/Container';
// import Categories from "../../../components/categories/showElementCategories";
// import LoadContent from "../../../components/loaders/loadContent"
// import InvitedBy from "../../../components/profile/invitedBy"

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  .videoPlayer {
    position: absolute;
    top: 0;
    left: 0;
    boxShadow: 0px 0px 30px rgba(0,0,0,.7);
  }
`;

const Banner = styled.div`
  background: #111111;
  width: 100%;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.contrast};
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${(props) => props.theme.palette.text.contrast};
`;

function SingleVideo() {
  const video = true;

  return (
    <>
      {video ? (
        <>
          <Banner>
            <Container>
              <PlayerWrapper>
                <ReactPlayer className="videoPlayer" width="100%" height="100%" url="https://www.youtube.com/watch?v=_GrKWkD6Htg" />
              </PlayerWrapper>
              <div style={{ marginTop: 32 }}>
                {/* <Categories categories={categories} /> */}
                Categories
                <Title>Título do Vídeo</Title>
                <Author>Participantes: Autor do Vídeo</Author>
              </div>
            </Container>
          </Banner>
          <Container>
            <div style={{ marginTop: 16 }}>
              Descrição do vídeo
              {/* <InvitedBy user={user} /> */}
            </div>
          </Container>
        </>
      ) : (
        <Container>
          <div>
            {/* <UnavaliableContent /> */}
            Conteúdo Indisponível
          </div>
        </Container>
      )}
    </>
  );
}

export default SingleVideo;
