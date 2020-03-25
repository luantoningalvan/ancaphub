import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom";

const CardFooter = styled(Link)`
    width: 100%;
    text-align:center;
    padding:15px;
    color: white;
    text-decoration:none;
    border-top:1px solid #2f3749;
    transition:0.3s;
    &:hover {   
        background: rgba(0,0,0,0.1)
    }
`;

export default props => (
    <CardFooter to={props.link} onClick={props.action}>
        {props.label}
    </CardFooter>
)