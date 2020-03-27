import React from "react";
import styled from "styled-components";

const FlipSwitchWrapper = styled.div`
  position: relative;
  width: 36px;
  user-select: none;
  margin: 0 0.5em;

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    & > div.switch-inner {
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
      &::before {
        content: "";
        padding-left: 12px;
        background-color: ${props => props.theme.pallete.secondary};
        color: #FFFFFF;
      }

      &::after {
        content: "";
        padding-right: 12px;
        background-color: ${props => props.theme.pallete.secondary};
        color: #888888;
        text-align: right;
      }
    }
    & > div.switch {
      width: 18px;
      margin: 0px;
      background: #FFFFFF;
      border: 2px solid #999999;
      border-radius: 5px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 22px;
      transition: all 0.3s ease-in 0s;
    }
  }



  .checkbox:checked + label > div.switch-inner {
    margin-left: 0;
  }

  .checkbox:checked + label > div.switch {
    right: 0;
  }
`;

export default (props) => {
  const label = `switch-${Math.floor(Math.random() * (1000))}`
  return (
    <FlipSwitchWrapper>
     <input type="checkbox" className="checkbox" id={label} {...props} />
     <label for={label}>
        <div className="switch-inner"></div>
        <div className="switch"></div>
      </label>
    </FlipSwitchWrapper>
  )
}