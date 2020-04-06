import React from 'react';
import styled from 'styled-components';
import ErrorIcon from 'react-ionicons/lib/IosAlertOutline';
import SucessIcon from 'react-ionicons/lib/IosCheckmarkCircleOutline';
import WarningIcon from 'react-ionicons/lib/IosWarning';
import InfoIcon from 'react-ionicons/lib/IosInformationCircleOutline';

const messages = {
  success: <SucessIcon />,
  error:  <ErrorIcon />,
  info:  <InfoIcon />,
  warning:  <WarningIcon />,
}

const Alert = styled.div`
  position: fixed;
  bottom: 16px;
  left: 80px;
  background: ${props => props.theme.palette.alert[props.status]};
  border-radius: 8px;
  color: white;
  padding: 16px;
  display: flex;
  align-items:center;
  span { font-size: 1em; line-height: 1em;}
  svg { fill: white; margin-right: 8px;}
`

export default ({ status = 'error', message = 'Erro' }) => (
  <Alert status={status}>
    {messages[status]}
    <span>{message}</span>
  </Alert>
)