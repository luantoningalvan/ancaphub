import styled from 'styled-components';

const CardHeader = styled.div`
    padding: 16px 16px 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    h3 { font-size:1em; }

    svg { fill: ${(props) => props.theme.palette.text.primary}}
`;

export default CardHeader;
