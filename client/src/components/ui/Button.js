import styled from "styled-components";

const Button = styled.button`
    background: ${props => props.variant === "outlined" ? "transparent": props.theme.palette[props.color]};
    cursor: pointer;
    color: ${props => props.variant === "outlined"  ? `${props.color ? props.theme.palette[props.color] : props.theme.palette.border}` : props.theme.palette.text.contrast};
    border-radius: 8px;
    font-size: .875rem;
    text-align: center;
    padding: ${props => props.size === "small" ? "8px" : "16px"};
    transition: background-color .2s ease-in-out,color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
    border: none;
    outline: none;
    width: ${props => props.fullwidth ? "100%" : "inherit"};
    border: ${props => props.variant === "outlined"  ? `1px solid ${props.color ? props.theme.palette[props.color] : props.theme.palette.border}` : "none"};
    transition: filter 0.3s;
    &:hover {
        filter: brightness(90%);
    }
`;

export default Button;