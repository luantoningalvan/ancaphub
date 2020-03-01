import React from "react";
import styled from 'styled-components'

// Icons
import SearchIcon from 'react-ionicons/lib/IosSearch'
import LocateIcon from 'react-ionicons/lib/MdLocate'

const SearchWrapper = styled.div`
  height:50px;
  border-radius:5px;
  width: 400px;
  background: rgba(0,0,0, 0.15);
  display: flex;
  align-items:center;
  color:white;
  padding: 0px 10px;

  > i svg { fill: white; }

  > input {
    border: none;
    background: transparent;
    height:50px;
    padding:10px;
    outline: none;
    flex-grow: 1;

    &::placeholder { color: #eee; font-size:16px; font-family: Ubuntu; }
  }

  > button {
    border:none;
    outline: none;
    background: transparent;
    cursor:pointer;
  }

  > button svg {
      fill: white
  }
`


const Search = () => {
  return (
      <SearchWrapper>
        <i><SearchIcon /></i>
        <input type="text" placeholder="Pesquisar..." />
        <button>
          <LocateIcon />
        </button>
      </SearchWrapper>
  )
};

export default Search;
