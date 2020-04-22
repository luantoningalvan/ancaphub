import React from "react";
import styled from "styled-components";
import Paper from "../ui/Paper";
import Button from "../ui/Button";
import { Link } from 'react-router-dom'
import LocationIcon from "react-ionicons/lib/IosPinOutline";

const Event = styled(Paper)`
  position: relative;
  .event-cover {
    height: 120px;
    overflow: hidden;
  }

  .event-date {
    position: absolute;
    top: 90px;
    left: 16px;
    height: 60px;
    width: 50px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .day {
      background: ${(props) => props.theme.palette.paperDark};
      height: 40px;
      font-weight: bold;
      font-size: 1.4em;
    }
    .month {
      font-size: 0.8em;
      background: ${(props) => props.theme.palette.primary};
      height: 20px;
    }
  }

  .event-content { padding: 16px; margin-top:20px;}
  h4 {
    font-size:1em;
    margin-top:8px;
  }
  .event-location {
    margin: 16px 0px;
    display: flex;
    align-items:center;

    svg {
      height:28px;
      width:28px;
      margin-left:-6px;
      margin-right: 2px;
      fill: ${(props) => props.theme.palette.primary};
    }
  }
`;

export default ({ event }) => {
  return (
    <Event>
      <div className="event-cover">
        <Link to={`/events/${event._id}`}>
        <img src={event.cover} />
        </Link>
      </div>

      <div className="event-date">
        <span className="month">ABR</span>
        <span className="day">20</span>
      </div>

      <div className="event-content">
        <h4>{event.title}</h4>

        <div className="event-location">
          <LocationIcon />
          <span>{event.location}</span>
        </div>
          <Button color="primary" fullwidth>Tenho Interesse</Button>
      </div>
    </Event>
  );
};
