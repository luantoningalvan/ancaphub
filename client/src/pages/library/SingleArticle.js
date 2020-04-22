import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import parse from 'html-react-parser';
import Paper from '../../components/ui/Paper';
import Container from '../../components/ui/Container';
import defaultThumbnail from '../../assets/default-book-cover.jpg';
import Categories from "../../components/categories/ShowCategories";

// import LoadContent from "../../../components/loaders/loadContent"
// import UnavaliableContent from "../../../components/error/unavaliableContent"
// import InvitedBy from "../../../components/profile/invitedBy"

// Redux
import { getSingleItemRequest as getSingleItem } from '../../actions/library';

const Banner = styled.div`
  background: url(${(props) => (props.cover ? props.cover : defaultThumbnail)}) rgba(0, 0, 0, 0.8);
  background-size: cover;
  background-position: center;
  width: 100%;
  background-blend-mode: overlay;
  padding: 96px 0px;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content:center;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 2.125rem;
  margin-bottom: 5px;
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 1.25rem;
`;

const SingleArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getSingleItem({ itemId: id }));
  }, [dispatch, id]);

  const { singleItem } = useSelector((state) => state.library);

  if (!singleItem) {
    return (
      <Container mt={2}>
        Unavailable content
      </Container>
    );
  }

  return singleItem && (
    <>
      <Banner cover={singleItem.cover && singleItem.cover.url}>
        <Container>
          <Categories categories={singleItem.categories} />
          <Title>{singleItem && singleItem.title}</Title>
          <Author>{singleItem && singleItem.title}</Author>
        </Container>
      </Banner>

      <div style={{ marginTop: -20 }}>
        <Container>
          <Paper padding>
            {parse(`${singleItem && singleItem.content}`)}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default SingleArticle;
