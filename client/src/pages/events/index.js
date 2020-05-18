import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Calendar as RCBC, dateFnsLocalizer } from 'react-big-calendar';
import {
  format, parse, startOfWeek, getDay,
} from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import BackButton from 'react-ionicons/lib/IosArrowBack';
import NextButton from 'react-ionicons/lib/IosArrowForward';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Button from '../../components/ui/Button';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import IconButton from '../../components/ui/IconButton';
import EventCard from '../../components/events/EventCard';
import CreateEvent from '../../components/events/CreateEvent';

const Calendar = styled(RCBC)`
  background: ${(props) => props.theme.palette.paperDark};
  padding: 16px;
  border-radius: 8px;

  .rbc-toolbar {
    margin: 16px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .month-switch,
  .view-switch {
    display: flex;
    align-items: center;
  }

  .month-switch {
    span {
      font-size: 1.1em;
      font-weight: bold;
      padding: 0px 16px;
    }
    svg {
      height: 20px;
      width: 20px;
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }

  .view-switch {
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.palette.border};
    overflow: hidden;
    button {
      padding: 12px;
      background: transparent;
      color: ${(props) => props.theme.palette.text.secondary};
      border-right: 1px solid ${(props) => props.theme.palette.border};
      cursor: pointer;
      &:last-child {
        border: none;
      }

      &:hover {
        background: ${(props) => props.theme.palette.border};
      }
    }
  }

  .rbc-month-view {
    display: flex;
    flex-direction: column;
  }

  .rbc-row {
    display: flex;
  }
  .rbc-header,
  .rbc-row-content,
  .rbc-row,
  .rbc-date-cell {
    flex: 1;
  }

  .rbc-header {
    text-align: center;
    padding: 20px 0px;
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 0.9em;
  }

  .rbc-date-cell {
    position: relative;
    height: 104px;
    padding: 16px;
    border-top: 1px solid ${(props) => props.theme.palette.border};
    border-right: 1px solid ${(props) => props.theme.palette.border};
    cursor: pointer;

    a {
      color: ${(props) => props.theme.palette.text.secondary};
    }

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .rbc-off-range {
    cursor: auto;
    background-color: ${(props) => props.theme.palette.paper};

    &:hover {
      background-color: ${(props) => props.theme.palette.paper};
    }
  }
  .rbc-row-segment {
    position: absolute;
    z-index: 100;
    font-size: 0.7em;
    background-color: ${(props) => props.theme.palette.secondary};
    padding: 8px;
    border-radius: 4px;
    margin-top: 50px;
  }
`;

const Toolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };
  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <div className="month-switch">
        <IconButton onClick={goToBack}>
          <BackButton />
        </IconButton>
        <span>{toolbar.label}</span>
        <IconButton onClick={goToNext}>
          {' '}
          <NextButton />
          {' '}
        </IconButton>
      </div>
      <ul className="view-switch">
        <li>
          <button>
            <FormattedMessage id="events.month" />
          </button>
        </li>
        <li>
          <button>
            <FormattedMessage id="events.week" />
          </button>
        </li>
        <li>
          <button>
            <FormattedMessage id="events.day" />
          </button>
        </li>
      </ul>
    </div>
  );
};


export default () => {
  const [createEventState, setCreateEventState] = useState(false);
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { pt: locale },
  });

  const events = [
    {
      _id: 1,
      start: Date.now(),
      end: Date.now(),
      title: 'AncapHub Week',
      cover: 'https://ancaphub.com/wp-content/uploads/2020/04/maxresdefault-360x240.jpg',
      location: 'Online',
    },
  ];

  const formats = {
    dateFormat: 'DD',
    weekdayFormat: 'dddd',
  };

  return (
    <Container>
      <Hero
        title={(
          <FormattedMessage
            id="common.events"
            description="Título da página de eventos"
          />
        )}
        description={(
          <FormattedMessage
            id="home.features.2"
            description="Descrição da página de eventos"
          />
        )}
        actions={<Button color="primary" onClick={() => setCreateEventState(true)}>Criar Evento</Button>}
      />

      <CreateEvent open={createEventState} onClose={() => setCreateEventState(false)} />

      <div style={{ marginTop: 16 }}>

        <Calendar
          startAccessor="start"
          endAccessor="end"
          localizer={localizer}
          events={events}
          drilldownView="day"
          components={{
            toolbar: Toolbar,
          }}
          views={{
            month: true,
            week: true,
            day: true,
          }}
          formats={formats}
        />

        <h3 style={{ marginTop: 24, fontSize: '1.7em' }}>Eventos Próximos</h3>
        <GridContainer style={{ margin: '16px 0px' }}>
          {events.map((event) => (
            <GridItem xs={3}>
              <EventCard event={event} />
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </Container>
  );
};
