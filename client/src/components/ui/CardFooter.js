import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom";

const CardFooter = styled(Link)`
    width: 100%;
    text-align:center;
    padding:15px;
    color: ${props => props.theme.palette.text.primary};
    text-decoration:none;
    border-top:1px solid ${props => props.theme.palette.border};
    transition:0.3s;
    border-radius: 0px 0px 10px 10px;
    &:hover {   
        color: ${props => props.theme.palette.text.secondary};
    }
`;

export default props => (
    <CardFooter to={props.link} onClick={props.action}>
        {props.label}
    </CardFooter>
)