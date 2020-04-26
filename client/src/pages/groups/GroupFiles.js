import React from "react";
import styled from "styled-components";
import Dropdown from "../../components/ui/Dropdown";
import DropdownListContainer from "../../components/ui/DropdownListContainer";
import DropdownListItem from "../../components/ui/DropdownListItem";
import Paper from "../../components/ui/Paper";
import DropdownIcon from "react-ionicons/lib/MdArrowDropdown";
import ListBoxIcon from "react-ionicons/lib/MdListBox";
import GridIcon from "react-ionicons/lib/MdGrid";
import IconButton from "../../components/ui/IconButton";
import FileIcon, { defaultStyles } from 'react-file-icon';

const FileExplorer = styled.div`
  margin-top: 16px;
  table {
    width: 100%;
    text-align: left;
    border-spacing: 0px;
    color: ${(props) => props.theme.palette.text.primary};

    thead {
      tr {
        font-size: 0.6875rem;
        letter-spacing: 1px;
        line-height: 1;
      }
    }

    th {
      user-select: none;
      border-bottom: 1px solid ${(props) => props.theme.palette.border};
      padding: 1rem;
    }
    th:hover {
      cursor: pointer;
      color: ${(props) => props.theme.palette.text.secondary};
    }
    td {
      padding: 0.3333333333rem 1rem;
      vertical-align: middle;
      svg {
        height:32px;
        width:32px;
        margin-right: 8px;
      }
    }
    td:hover {
      cursor: pointer;
    }
    tr:nth-child(even) {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom: 16px;

  ul{
    display:flex;
    align-items:center;
  }
  li { 
    list-style: none;
    padding: 8px;
     
    svg{
      fill: ${(props) => props.theme.palette.text.primary};

    }
  }
`

const filelist = [
  {
    name: "45 ACP Smith And Wesson",
    updatedAt: "23/04/2020 às 18:37",
    type: "stl",
    size: "4.23mb",
  },
  {
    name: "Hino união soviética",
    updatedAt: "23/04/2020 às 18:37",
    type: "mp3",
    size: "3.11mb",
  },
];

export default () => {
  return (
    <FileExplorer>
      <Toolbar>
        <span>
          {filelist.length} arquivos
        </span>
        <ul>
          <li><ListBoxIcon /></li>
          <li><GridIcon /></li>
        </ul>
      </Toolbar>
      <Paper>
      <table>
        <thead>
          <th>Nome</th>
          <th>Última modificação</th>
          <th>Tipo</th>
          <th>Tamanho</th>
          <th></th>
        </thead>

        <tbody>
          {filelist.map((file) => (
            <tr>
              <td>
                <div  style={{display: 'flex', alignItems: 'center'}}>
                <FileIcon extension={file.type} {...defaultStyles[file.type]}/>
                {file.name}
                </div>

                </td>
              <td>{file.updatedAt}</td>
              <td>{file.type}</td>
              <td>{file.size}</td>
              <td style={{width: 48}}>
                <Dropdown
                  toggle={
                    <IconButton>
                      <DropdownIcon />
                    </IconButton>
                  }
                >
                  <DropdownListContainer>
                    <DropdownListItem>Baixar</DropdownListItem>
                    <DropdownListItem>Excluir</DropdownListItem>
                  </DropdownListContainer>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Paper>
    </FileExplorer>
  );
};
