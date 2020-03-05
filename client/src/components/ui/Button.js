import styled from 'styled-components'

const Button = styled.button`
    background: ${props => props.color === "secondary" ? props.theme.pallete.secondary : props.theme.pallete.paper};
    cursor: pointer;
    color: ${props => props.theme.pallete.text.primary};
    border-radius: 10px;
    font-size: .875rem;
    text-align: center;
    padding: ${props => props.size === "small" ? "10px" : "15px"};
    transition: background-color .2s ease-in-out,color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
    box-shadow: ${ props => props.disableElevation ? "none" : "3px 5px 10px 0 rgba(0,0,0,.2)"};
    border: none;
    outline: none;
    width: ${props => props.fullwidth ? '100%' : 'inherit'};
    border: ${props => props.variant === "outlined" ? '1px solid #2f3749' : 'none'};
    transition: background 0.4s;
    &:hover {
        background: rgba(0,0,0,0.2)
    }
`

export default Button