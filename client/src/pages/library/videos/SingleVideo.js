import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Container from '../../../components/ui/Container';
// import Categories from "../../../components/categories/showElementCategories";
// import LoadContent from "../../../components/loaders/loadContent"
// import InvitedBy from "../../../components/profile/invitedBy"

// Redux
import { getSingleItemRequest } from '../../../actions/library';

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
  background: ${(props) => props.theme.palette.paperDark};
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

const SingleVideo = ({ getSingleItemRequest: getSingleItem }) => {
  const { id } = useParams();

  React.useEffect(() => {
    getSingleItem({ itemId: id });
  }, [getSingleItem, id]);

  const { singleItem } = useSelector((state) => state.library);

  return singleItem && (
    <>
      <Banner>
        <Container>
          <PlayerWrapper>
            <ReactPlayer className="videoPlayer" width="100%" height="100%" url={singleItem.extraFields.videoUrl} />
          </PlayerWrapper>
          <div style={{ marginTop: 32 }}>
            {/* <Categories categories={categories} /> */}
            Categories
            <Title>{singleItem.title}</Title>
            <Author>
              Participantes:
              {' '}
              {singleItem.author}
            </Author>
          </div>
        </Container>
      </Banner>
      <Container>
        <div style={{ marginTop: 16 }}>
          {singleItem.content}
          {/* <InvitedBy user={user} /> */}
        </div>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ getSingleItemRequest }, dispatch);
export default connect(null, mapDispatchToProps)(SingleVideo);
