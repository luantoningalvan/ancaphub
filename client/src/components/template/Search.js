import React, { memo, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from 'react-ionicons/lib/IosSearch';
import LocateIcon from 'react-ionicons/lib/MdLocate';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory } from 'react-router-dom'

const SearchWrapper = styled.div`
  height: 50px;
  border-radius: 5px;
  width: 400px;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 0px 10px;
  > i svg {
    fill: ${(props) => props.theme.palette.text.contrast};
  }
  > input {
    border: none;
    background: transparent;
    height: 50px;
    padding: 10px;
    outline: none;
    flex-grow: 1;
    color: ${(props) => props.theme.palette.text.contrast};

    &::placeholder {
      color: ${(props) => props.theme.palette.text.contrast};
      font-size: 16px;
      font-family: Ubuntu;
    }
  }
  > button {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }
  > a svg {
    fill: white;
  }
`;

const Search = () => {
  const [term, setTerm] = useState("")
  const history = useHistory()
  
  const search = () => {
    if(term !== ""){
      history.push(`/search?s=${term}`)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      search()
    }
  }

return(
  <SearchWrapper>
    <i>
      <SearchIcon />
    </i>
    <FormattedMessage id="common.search" description="Input de pesquisa">
      {(msg) => 
      <input 
      type="text" 
      placeholder={msg} 
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      onKeyPress={handleKeyPress}
      />
      }
    </FormattedMessage>
    <Link to="/nearby">
      <LocateIcon />
    </Link>
  </SearchWrapper>
);
}
export default memo(Search);
