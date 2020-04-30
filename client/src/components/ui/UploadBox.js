import styled from "styled-components";

const UploadBox = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 8px;
  border: 1px dashed ${(props) => props.theme.palette.text.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  svg {
    fill: ${(props) => props.theme.palette.text.secondary};
    height: 40px;
    width: 40px;
    margin-bottom: 16px;
  }
`;

export default UploadBox