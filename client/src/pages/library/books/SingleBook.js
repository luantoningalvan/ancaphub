import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '../../../components/ui/Paper';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';
import defaultThumbnail from '../../../assets/default-book-cover.jpg';
// import Categories from "../../../components/categories/showElementCategories";
// import Ratings from "../../../components/library/ratings";
// import InvitedBy from "../../../components/profile/invitedBy"
// import UnavaliableContent from "../../../components/error/unavaliableContent"

// Redux
import { getSingleItemRequest } from '../../../actions/library';

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
    margin-bottom: 34px
  `;

const BookCover = styled.img`
    width: 100%;
  `;

const Banner = styled.div`
    background: url(${(props) => (props.cover ? props.cover : defaultThumbnail)}) rgba(0, 0, 0, 0.5);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    width: 100%;
    height: 230px;

    &:after {
      height: 230px;
      width: 100%;

      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 1) 100%
      );
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.7;
    }
  `;

function SingleBook({ getSingleItemRequest: getSingleItem }) {
  const { id } = useParams();

  React.useEffect(() => {
    getSingleItem({ itemId: id });
  }, [getSingleItem, id]);

  const { singleItem } = useSelector((state) => state.library);

  return (
    <>
      <Banner cover={defaultThumbnail} />
      <div style={{ marginTop: -137, position: 'absolute', width: 'inherit' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '33.3333% auto', gap: '1.4em' }}>
            <div>
              <Paper>
                <BookCover src={defaultThumbnail} />
                <div style={{ padding: 10 }}>
                  <Button fullwidth color="secondary">Baixar</Button>
                  <div style={{ display: 'flex', marginTop: 8 }}>
                    <Button variant="outlined" color="primary" style={{ marginRight: 8, flex: 1 }}>Salvar</Button>
                    <Button variant="outlined" color="primary" style={{ marginRight: 8, flex: 1 }}>Lista</Button>
                    <Button variant="outlined" color="primary" style={{ flex: 1 }}>Compartilhar</Button>
                  </div>
                </div>
              </Paper>
              {/* <InvitedBy user={user} /> */}
              InvitedBy
            </div>
            <div>
              {/* <Categories categories={categories} /> */}
              <div style={{ padding: '15px 0px' }}>
                Categories
              </div>
              <Title>{singleItem && singleItem.title}</Title>
              <Author>{singleItem && singleItem.author}</Author>
              <div>
                {singleItem && singleItem.content}
              </div>
              <div my={2}>{/* <Ratings item={book.item} /> */}</div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ getSingleItemRequest }, dispatch);
export default connect(null, mapDispatchToProps)(SingleBook);
