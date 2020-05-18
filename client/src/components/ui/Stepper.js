import React from 'react';
import styled from 'styled-components';

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-bottom: 28px;
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;

  .step-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .step-id {
    height: 40px;
    width: 40px;
    background: ${({ theme, checked, current }) => (checked || current ? theme.palette.secondary : theme.palette.paper)};
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  span { 
    position: absolute; 
    top: 48px;
    line-height: 20px;
  }

  &:after {
    content: "";
    height: 2px;
    width: calc(100% - 40px);
    background: ${({ theme, checked }) => (checked ? theme.palette.secondary : theme.palette.paper)};
  }

  &:first-child {
    &:before {
      content: "";
      height: 0px;
      width: 0px;
    }
  }


  &:last-child {
    flex: inherit;
    &:after {
      content: "";
      height: 0px;
      width: 0px;
    }
  }
}
`;

export default ({ steps, currentStep, setStepAction }) => (
  <Stepper>
    {steps.map((step, index) => (
      <Step
        checked={currentStep > (index + 1)}
        current={currentStep === (index + 1)}
      >
        <div className="step-content" onClick={() => setStepAction(index + 1)}>
          <div className="step-id">{step.icon || index + 1}</div>
          <span>{step.label}</span>
        </div>
      </Step>
    ))}
  </Stepper>
);
