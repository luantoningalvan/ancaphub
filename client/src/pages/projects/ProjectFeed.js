import React from 'react';
import GridContainer from '../../components/ui/GridContainer'
import GridItem from '../../components/ui/GridItem'
import CardBody from '../../components/ui/CardBody';
import CardHeader from '../../components/ui/CardHeader';
import Card from '../../components/ui/Card';
import Paper from '../../components/ui/Paper';
import styled from 'styled-components'
import CalendarIcon from 'react-ionicons/lib/IosCalendar'

const Post = styled(Paper)`
  display: flex;
  height:150px;
  margin-bottom: 16px;

  .post-cover {
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 40%;
    overflow:hidden;
    cursor:pointer;

    img {
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  .post-content {
    flex-grow: 0;
    flex-shrink:0;
    flex-basis: 60%;
    padding: 16px;

    .date {
      display: flex;
      margin-bottom:8px;
      align-items:center;
      svg { fill: white; height: 20px; width: 20px;margin-right: 8px; }
    }
  }
`

export default () => (
  <GridContainer spacing={2}>
    <GridItem xs={7}>
    <Post>
        <div className="post-cover">
          <img src="https://i.ytimg.com/vi/ld4fLpniEp0/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpd0xB4vV9bqgrLVD6bHLlu_YLdg" />
        </div>
        <div className="post-content">
          <div className="date">
          <CalendarIcon />
          <span>20/04</span>
          </div>
          <h3>Novo Feed e Perfil</h3>
          <p>No nosso décimo episódio iniciamos a demonstração do nosso nov...</p>
        </div>
      </Post>
      <Post>
        <div className="post-cover">
          <img src="https://i.ytimg.com/vi/ld4fLpniEp0/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpd0xB4vV9bqgrLVD6bHLlu_YLdg" />
        </div>
        <div className="post-content">
          <div className="date">
          <CalendarIcon />
          <span>20/04</span>
          </div>
          <h3>Novo Feed e Perfil</h3>
          <p>No nosso décimo episódio iniciamos a demonstração do nosso nov...</p>
        </div>
      </Post>
      <Post>
        <div className="post-cover">
          <img src="https://i.ytimg.com/vi/ld4fLpniEp0/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpd0xB4vV9bqgrLVD6bHLlu_YLdg" />
        </div>
        <div className="post-content">
          <div className="date">
          <CalendarIcon />
          <span>20/04</span>
          </div>
          <h3>Novo Feed e Perfil</h3>
          <p>No nosso décimo episódio iniciamos a demonstração do nosso nov...</p>
        </div>
      </Post>

    </GridItem>
    <GridItem xs={5}>
      <Card>
        <CardHeader><h3>Widget title</h3></CardHeader>
        <CardBody>
Widget content
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
);
