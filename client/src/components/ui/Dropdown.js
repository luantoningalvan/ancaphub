import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Reference, Manager, Popper } from "react-popper";

const clickAwayListener = (ref, action) => {
  function handleTriggerAction(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      action();
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    document.addEventListener("mousedown", handleTriggerAction);
    return function cleanup() {
      document.removeEventListener("mousedown", handleTriggerAction);
    }
  });
};

const DropdownListContainer = styled.div`
  background-color: ${props => props.theme.pallete.paper};
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  z-index: 1000;
  
  & > div:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  & > div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const DropdownListItem = styled.div`
  min-width: 100px;
  max-width: 200px;
  padding: 8px;
  transition: background-color 150ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Dropdown = ({ options, children, placement }) => {
    const [showing, setShowing] = React.useState(false);
    const listRef = React.useRef(null);
    const wrappedComponentRef = React.useRef(null);
    const popperModifiers = {
      shift: {
        enabled: true,
      },
      flip: {
        enabled: true,
        flipVariationsByContent: true,
        behavior: "flip",
      },
      preventOverflow: {
        padding: 0,
      }
    };
  
    const setListRef = React.useCallback((node, ref) => {
      listRef.current = node;
      return ref(node);
    }, []);
  
    const setWrappedComponentRef = React.useCallback((node, ref) => {
      wrappedComponentRef.current = node;
      return ref(node);
    }, [wrappedComponentRef]);
  
    const toggle = () => {
      setShowing(!showing);
    }
    
    clickAwayListener(listRef, toggle);

    const Element = React.Children.toArray(children)[0];

    return (
      <Manager>
        <div>
          <Reference>
            {({ ref }) => (
              <div>
                { React.cloneElement(Element, { onClick: () => toggle(), ref: node => setWrappedComponentRef(node, ref) }) }
              </div>
            )}
          </Reference>
          {showing && (
            <Popper placement={placement} modifiers={popperModifiers}>
              {({ ref, style, placement }) => (
                <DropdownListContainer ref={node => setListRef(node, ref)} style={style} data-placement={placement}>
                  { options.map(option => (
                    <DropdownListItem key={option.text} onClick={() => {
                      if (typeof option.action === "function" && option.action !== undefined) {
                        option.action();
                      }
                      toggle();
                     }}>
                      {option.text}
                    </DropdownListItem>
                  )) }
                </DropdownListContainer>
              )}
            </Popper>
          )}
        </div>
      </Manager>
    );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placement: PropTypes.oneOf(["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-end", "right-start", "left", "left-end", "left-start", "bottom", "bottom-end", "bottom-start"])
}

export default Dropdown;