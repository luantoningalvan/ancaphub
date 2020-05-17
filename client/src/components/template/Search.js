import React, { memo, useState } from "react";
import styled from "styled-components";
import SearchIcon from "react-ionicons/lib/IosSearch";
import BackIcon from "react-ionicons/lib/IosArrowBack";
import LocateIcon from "react-ionicons/lib/MdLocate";
import IconButton from "../ui/IconButton";
import { FormattedMessage } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";

const SearchWrapper = styled.div`
  .not-collapsed {
    height: 64px;
    width: 100%;
    padding: 0px 16px;
    background: ${(props) => props.theme.palette.paper};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;

    > input {
      border: none;
      background: transparent;
      height: 50px;
      padding: 16px;
      outline: none;
      flex: 1;
      color: ${(props) => props.theme.palette.text.contrast};

      &::placeholder {
        color: ${(props) => props.theme.palette.text.contrast};
        font-size: 16px;
        font-family: Ubuntu;
      }
    }

    > a svg {
      fill: white;
    }
  }
  .mobile-search {
    svg {
      fill: ${(props) => props.theme.palette.text.contrast};
      width: 22px;
      height: 22px;
    }
    > button {
      border: none;
      border-radius: 5px;
      padding: 10px;
      outline: none;
      background: transparent;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.15);
      }
    }
  }

  .desktop-search {
    display: none;
  }

  @media (min-width: 576px) {
    .mobile-search { display: none; }
    .desktop-search {
      display: block;
      background: rgba(0,0,0,.15);
      width: 360px;
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items:center;
      padding:8px;

      svg { fill: ${props => props.theme.palette.text.contrast}}

      input {
        flex: 1;
        padding:8px;
        border: none;
        background: transparent;
      }
      
      input, 
      input::placeholder {
        color: ${props => props.theme.palette.text.contrast};
        font-size: 1rem;
      }
    }
  }
`;

const Search = () => {
  const [term, setTerm] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const history = useHistory();

  const search = () => {
    if (term !== "") {
      history.push(`/search?s=${term}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <SearchWrapper>
      <div className={clsx("mobile-search", !collapsed && "not-collapsed")}>
        {collapsed ? (
          <IconButton onClick={() => setCollapsed(false)}>
            <SearchIcon />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setCollapsed(true)}>
              <BackIcon />
            </IconButton>
            <FormattedMessage
              id="common.search"
              description="Input de pesquisa"
            >
              {(msg) => (
                <input
                  type="text"
                  placeholder={msg}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              )}
            </FormattedMessage>

            <Link to="/nearby">
              <LocateIcon />
            </Link>
          </>
        )}
      </div>
      <div className="desktop-search">
        <i>
          <SearchIcon />
        </i>
        <FormattedMessage id="common.search" description="Input de pesquisa">
          {(msg) => (
            <input
              type="text"
              placeholder={msg}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          )}
        </FormattedMessage>

        <Link to="/nearby">
          <LocateIcon />
        </Link>
      </div>
    </SearchWrapper>
  );
};
export default memo(Search);
