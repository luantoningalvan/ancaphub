import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledLink = styled(Link)`
  display: block;
  padding: 9.5px;
  margin: 10px;
  border-radius: 5px;
  background: ${(props) => (props.current ? props.theme.palette.secondary : 'transparent')};

  > i svg {
    fill: ${(props) => (props.current
    ? props.theme.palette.text.contrast
    : props.theme.palette.text.secondary)};
    margin-right: 8px;
  }

  span {
    color: ${(props) => (props.current
    ? props.theme.palette.text.contrast
    : props.theme.palette.text.secondary)};
  }

  &:hover {
    background: ${(props) => props.theme.palette.secondary};
    > i svg {
      fill: ${(props) => props.theme.palette.text.contrast};
    }
  }

  @media (min-width: 576px) { span {display: none}}
`;

export const Item = styled.li`
  list-style: none;
  position: ${(props) => props.position};

  a {
    display:flex;
    align-items:center;
  }

  &:hover {
    ul {
      display: block;
    }
  }
`;

const MenuItem = ({ link, icon, current, label}) => (
  <Item>
    <StyledLink to={link} current={!!current}>
      <i>{icon}</i>
<span>{label}</span>
    </StyledLink>
  </Item>
);

MenuItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
  current: PropTypes.bool,
};

export default MenuItem;
