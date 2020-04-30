import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LocationIcon from 'react-ionicons/lib/IosPinOutline';
import TicketIcon from 'react-ionicons/lib/IosCash';
import HourIcon from 'react-ionicons/lib/IosClock';
import PeopleIcon from 'react-ionicons/lib/IosPeople';
import Container from '../../components/ui/Container';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Paper from '../../components/ui/Paper';
import Button from '../../components/ui/Button';


const Event = styled.div`
  margin-top: 16px;

  .event-header {
    border-radius: 8px;
    height: 320px;
    width: 100%;
    overflow: hidden;
    position: relative;

    .event-cover {
      position: absolute;
      width: 100%;
      border-radius: 16px;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
      }

      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.65) 20%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    .event-header-content {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32px;
    }
    .event-date {
      height: 60px;
      width: 60px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .day {
        background: ${(props) => props.theme.palette.paperDark};
        height: 48px;
        font-weight: bold;
        font-size: 1.4em;
      }
      .month {
        font-size: 0.8em;
        background: ${(props) => props.theme.palette.primary};
        height: 24px;
      }
    }
    .time {
      display: block;
      color: ${(props) => props.theme.palette.secondary};
      margin: 16px 0px 0px;
    }
    h2 {
      font-size: 1.8em;
    }
    .event-location {
      margin-top: 8px;
      display: flex;
      align-items: center;

      svg {
        height: 28px;
        width: 28px;
        margin-left: -6px;
        margin-right: 2px;
        fill: ${(props) => props.theme.palette.primary};
      }
    }
  }

  .info-card {
    width: 100%;
    padding: 16px;

    p { padding: 8px; font-size:1em;}

    li {
      display:flex;
      align-items:center;
      padding:8px;
    }
    li svg {
      fill: white;
      height:26px;
      width:26px;
      margin-right: 8px;
    }
  }
`;

export default () => (
  <Container>
    <Event>
      <div className="event-header">
        <div className="event-cover">
          <img src="https://pbs.twimg.com/media/EWCrT8iXQAMp5s0?format=jpg&name=large" alt="event cover" />
        </div>

        <div className="event-header-content">
          <div>
            <div className="event-date">
              <span className="month">ABR</span>
              <span className="day">20</span>
            </div>
            <span className="time">
              <FormattedMessage id="events.time" values={{ from: '08:00', to: '20:00' }} />
            </span>
            <h2>AncapHub Week</h2>
            <div className="event-location">
              <LocationIcon />
              <span>Online</span>
            </div>
          </div>

          <div>
            <Button color="primary" style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.7)' }}>Tenho Interesse</Button>
          </div>
        </div>
      </div>

      <GridContainer spacing={2} style={{ margin: '16px 0px' }}>
        <GridItem xs={6}>
          <Paper className="info-card">
            <ul>
              <li>
                <PeopleIcon />
                <span>
                  <FormattedMessage id="events.attendance" values={{ num: 53 }} />
                </span>
              </li>
              <li>
                <HourIcon />
                <span>
                  <FormattedMessage id="events.time" values={{ from: '08:00', to: '20:00' }} />
                </span>
              </li>
              <li>
                <LocationIcon />
                <span>Online</span>
              </li>
              <li>
                <TicketIcon />
                <span>
                  <FormattedMessage id="events.free" />
                </span>
              </li>
            </ul>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare risus quis neque suscipit, ut semper orci rhoncus. Proin lobortis nisl eu nisi placerat, ac faucibus lacus finibus.
            </p>
          </Paper>
        </GridItem>
        <GridItem xs={6}>
          <h3 style={{ marginBottom: 8 }}>
            <FormattedMessage id="events.howToGet" />
          </h3>
          <iframe
            title="event map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112277.11744442317!2d-51.7964725!3d-28.429516800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1587573920904!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            frameBorder="0"

            style={{ width: '100%', height: 300, borderRadius: 8 }}
          />
        </GridItem>
      </GridContainer>
    </Event>
  </Container>
);
