import styled from 'styled-components';

const DropdownListContainer = styled.ul`
  border-radius: 5px;
  font-size: 0.9em;
  z-index: 1000;
  padding: 8px 0;

  & > div:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  & > div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export default DropdownListContainer;
