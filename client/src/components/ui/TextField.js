import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextField = styled.input`
    background: transparent;
    border: 1px solid ${(props) => props.theme.palette.border};
    padding: 16px;
    border-radius: 8px;
    outline: none;
    color: white;
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

TextField.propTypes = {
  fullWidth: PropTypes.bool,
};

export default TextField;
