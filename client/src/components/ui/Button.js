import styled from 'styled-components'

const Button = styled.button`
    background: ${props => props.color === "secondary" ? props.theme.pallete.secondary : props.theme.pallete.paper};
    cursor: pointer;
    color: ${props => props.theme.pallete.text.primary};
    border-radius: 10px;
    font-size: .875rem;
    text-align: center;
    padding: 15px;
    transition: background-color .2s ease-in-out,color .2s ease-in-out,border-color .2s ease-in-out,box-shadow .2s ease-in-out;
    box-shadow: 3px 5px 10px 0 rgba(0,0,0,.2);
    border: none;
    outline: none;
`

export default Button