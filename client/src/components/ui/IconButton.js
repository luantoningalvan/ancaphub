import styled from "styled-components"

const IconButton = styled.button`
    background: transparent;
    cursor: pointer;
    border-radius: 100%;
    text-align: center;
    padding: 5px;
    transition: background-color .2s ease-in-out,color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
    border: none;
    outline: none;

    > svg { 
        fill: ${props => props.theme.palette.text.secondary};
        height: 2em;
        width: 2em;
     }
`;

export default IconButton;