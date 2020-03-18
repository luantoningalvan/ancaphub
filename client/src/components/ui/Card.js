import styled from "styled-components";

const Card = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    background: ${ props => props.theme.pallete.paper};
    color: ${props => props.theme.pallete.text.primary};
    border-radius: 10px;
`;

export default Card;