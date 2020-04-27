import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ApprovedIcon from 'react-ionicons/lib/IosCheckmarkCircle';
import PendingIcon from 'react-ionicons/lib/IosBulb';
import ReprovedIcon from 'react-ionicons/lib/IosAlert';
import PointsIcon from 'react-ionicons/lib/IosStar';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Button from '../../components/ui/Button';

const InfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap:16px;
  margin-top: 16px;
`;

const InfoCard = styled.li`
  background: ${(props) => props.theme.palette.primary};
  width:100%;
  padding:16px;
  list-style:none;
  border-radius: 8px;
  position:relative;
  display:flex;
  justify-content: space-between;
  align-items:center;

  svg{
    height:80px;
    width:80px;
    fill: rgba(0,0,0,0.2)
  }

  h3{
    font-weight: lighter;
    margin-top:5px;
  }
  span{
    display:block;
    font-size: 2em;
    font-weight: bold;
    line-height:100%;
  }
`;

export default () => (
  <Container>
    <Hero
      title={(
        <FormattedMessage
          id="common.contributions"
          description="Título da página de contribuições"
        />
        )}
      actions={(
        <Button color="primary" variant="outlined">
          <FormattedMessage id="library.contribute" />
        </Button>
      )}
    />

    <div>
      <InfoList>
        <InfoCard>
          <div>
            <span>5</span>
            <h3>
              <FormattedMessage id="library.status.approvedPlural" />
            </h3>
          </div>
          <ApprovedIcon />
        </InfoCard>
        <InfoCard>
          <div>
            <span>2</span>
            <h3>
              <FormattedMessage id="library.status.underAnalysis" />
            </h3>
          </div>
          <PendingIcon />
        </InfoCard>
        <InfoCard>
          <div>
            <span>1</span>
            <h3>
              <FormattedMessage id="library.status.rejectedPlural" />
            </h3>
          </div>
          <ReprovedIcon />
        </InfoCard>
        <InfoCard>
          <div>
            <span>90</span>
            <h3>
              <FormattedMessage id="library.points" />
            </h3>
          </div>
          <PointsIcon />
        </InfoCard>
      </InfoList>
    </div>

  </Container>
);
