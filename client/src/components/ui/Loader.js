import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  & > svg {
    width: ${(props) => props.size || 72}px;
    height: ${(props) => props.size || 72}px;
    animation: spin 1s linear infinite;
  }
`;

const Loader = (props) => (
  <LoaderWrapper {...props}>
    <svg viewBox="0 0 40 40">
      <linearGradient id="spinner-gradient">
        <stop offset="0%" stopOpacity="0" />
        <stop offset="49.9%" stopOpacity="0" />
        <stop offset="50%" stopColor="#FFCC00" />
        <stop offset="100%" stopColor="#FFCC00" />
      </linearGradient>
      <circle r={5} cx={20} cy={20} fill="transparent" stroke="url(#spinner-gradient)" strokeWidth={1} />
    </svg>
  </LoaderWrapper>
);

export default Loader;
