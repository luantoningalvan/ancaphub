import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";
import { Calendar as RCBC, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import styled from "styled-components";
import BackButton from 'react-ionicons/lib/IosArrowBack'
import NextButton from 'react-ionicons/lib/IosArrowForward'

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
  .view-switch { display: flex; align-items:center;}

  .month-switch {
    span {
      font-size:1.1em;
      font-weight: bold;
      padding: 0px 16px;
    }
    svg { 
      height:20px;
      width:20px;
      color: ${(props) => props.theme.palette.text.secondary}; 
    }
  }

  .view-switch{
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.palette.border}; 
    overflow: hidden;
    button { 
      padding: 12px;
      background:transparent;
      color: ${(props) => props.theme.palette.text.secondary};
      border-right: 1px solid ${(props) => props.theme.palette.border}; 
      cursor: pointer;
      &:last-child { border: none; }

      &:hover {
        background: ${(props) => props.theme.palette.border}; 
      }
    }
  }

  .rbc-month-view {
    display: flex;
    flex-direction: column;
  }

  .rbc-row { display: flex; }
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
    font-size:0.9em;
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
      background: rgba(0,0,0,0.1);
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
    z-index:100;
    font-size:0.7em;
    background-color: ${(props) => props.theme.palette.secondary};
    padding:8px;
    border-radius: 4px;
    margin-top: 50px;
  }
`;

const Toolbar = (toolbar) => {
const goToBack = () => { toolbar.onNavigate('PREV'); };
const goToNext = () => { toolbar.onNavigate('NEXT'); };
console.log(toolbar)
return (
  <div className='rbc-toolbar'>
    <div className="month-switch">
      <IconButton onClick={goToBack}><BackButton /></IconButton>
      <span>{toolbar.label}</span>
      <IconButton onClick={goToNext}> <NextButton /> </IconButton>
    </div>
      <ul className="view-switch">
        <li>
          <button>Mês</button>
        </li>
        <li>
          <button>Semana</button>
        </li>
        <li>
          <button>Dia</button>
        </li>
      </ul>
  </div>
)}

export default () => {
  const [month, setMonth] = useState(moment().month())
  moment.locale("pt-br");
  const localizer = momentLocalizer(moment);
  const events = [
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Some title",
    },
  ];

  let formats = {
    dateFormat: "DD",
    weekdayFormat: "dddd",
  };


  return (
    <Container>
      <Hero
        title={
          <FormattedMessage
            id="common.events"
            description="Título da página de eventos"
          />
        }
        description={
          <FormattedMessage
            id="home.features.2"
            description="Descrição da página de eventos"
          />
        }
        actions={<Button color="primary">Criar Evento</Button>}
      />

      <div style={{ marginTop: 16 }}>
        <Calendar
          localizer={localizer}
          events={events}
          drilldownView="day"
          components={{
            toolbar: Toolbar
          }}
          views={{
            month: true,
            week: true,
            day: true,
          }}
          formats={formats}
        />
      </div>
    </Container>
  );
};
