import styled from 'styled-components'

const Paper = styled.div`
    background: ${ props => props.theme.pallete.paper};
    color: ${props => props.theme.pallete.text.primary};
    border-radius: 10px;
    padding: ${props => props.padding && '16px'};
    overflow: hidden
`

export default Paper