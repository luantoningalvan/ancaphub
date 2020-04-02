import styled from "styled-components";
import Paper from "../../ui/Paper";

export default styled(Paper)`
  .form-actions {
    display: flex;
    justify-content: flex-start;
    padding: 15px;
    border-top: 1px solid ${props => props.theme.palette.border};
    background: ${props => props.theme.palette.paperDark};
  }

  .text-box {
    padding: 20px;
    min-height: 100px;
  }

  .upload-button {
    [type="file"] {
      border: 0;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      width: 1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
    }

    svg {
      cursor: pointer;
      fill: ${props => props.theme.palette.text.secondary};
      height: 2em;
      width: 2em;
      margin: 2.5px 0;
      padding: 2px;
    }

    label {
      clear: both;
    }

    [type="file"] + label {
      cursor: pointer;
      display: inline-block;
    }
  }

  .media-preview {
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    margin-top: 20px;
    border: 1px solid ${props => props.theme.palette.border};
  }

  .image-box {
    max-height: 350px;

    .close-icon {
      height: 38px;
      width: 38px;
      background: red;
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 100;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .poll-box {
    display: flex;
    padding: 15px;

    ul {
      flex: 1;
    }
    li {
      list-style: none;
    }
  }
`;
