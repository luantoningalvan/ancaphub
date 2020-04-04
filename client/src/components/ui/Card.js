import styled from 'styled-components';

const Card = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    background: ${(props) => props.theme.palette.paper};
    color: ${(props) => props.theme.palette.text.primary};
    border: ${(props) => props.bordered 
        ? `1px solid ${props.theme.palette.border}`
        : 'none'
    };
    border-radius: 10px;
`;

export default Card;
