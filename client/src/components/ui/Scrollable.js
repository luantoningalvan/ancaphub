import React from 'react';
import styled from 'styled-components';

const ScrollableWrap = styled.div`
  display: flex;
  flex-grow: ${(props) => (props.grow ? 1 : 0)};
  flex-direction: column;
  position: relative;
  border-right: 1px solid #2f3749;
  & > div.wrapped {
    width: 100%;
    overflow-y: scroll;
    flex: 1;

    & > div.inner {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    &::-webkit-scrollbar {
      width: 0.2em;
    }

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      overflow: visible;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  & > div.cover {
    position: absolute;
    background: ${(props) => props.theme.palette.paper};
    height: 100%;
    top: 0;
    right: 0;
    width: 0.2em;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  &:hover > div.cover {
    opacity: 0;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
  }
`;

const Scrollable = ({
  scrollableContent, topContent, bottomContent, grow,
}) => (
  <ScrollableWrap grow={grow}>
    {topContent}
    <div className="wrapped">
      <div className="inner">{scrollableContent}</div>
    </div>
    {bottomContent}
    <div className="cover" />
  </ScrollableWrap>
);

export default Scrollable;
