import styled from "styled-components"

const Tab = styled.li`
  list-style: none;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid ${props => props.theme.palette.border};
  }

  .current {
    border-bottom: 3px solid ${props => props.theme.palette.secondary};
  }
  > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 16px 32px;
  }
`;

export default Tab;