import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CardFooterWrap = styled(Link)`
    width: 100%;
    text-align:center;
    padding:15px;
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration:none;
    border-top:1px solid ${(props) => props.theme.palette.border};
    transition:0.3s;
    border-radius: 0px 0px 10px 10px;
    &:hover {   
        color: ${(props) => props.theme.palette.text.secondary};
    }
`;

const CardFooter = ({ link, action, label }) => (
  <CardFooterWrap to={link} onClick={action}>
    {label}
  </CardFooterWrap>
);

CardFooter.propTypes = {
  link: PropTypes.string,
  action: PropTypes.func,
  label: PropTypes.string,
};

CardFooter.defaultProps = {
  link: '#',
  action: undefined,
  label: undefined,
};

export default CardFooter;
