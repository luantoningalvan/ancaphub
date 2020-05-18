import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextField = styled.input`
    background: transparent;
    border: 1px solid ${(props) => (!props.hasError
    ? props.theme.palette.border
    : '#f93c3c')
};
    padding: 16px;
    border-radius: 8px;
    outline: none;
    color: white;
    width: 100%;
`;

TextField.propTypes = {
  fullWidth: PropTypes.bool,
};

export default TextField;
