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

const DropdownTitleContainer = styled.div`
  background-color: #293249;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 8px 1em;
  h3 {
    color: white;
  }
`

const DropdownListContainer = styled.div`
  background-color: #293249;
  border-radius: 5px;
  font-size: 0.9em;
  z-index: 1000;
  padding: 10px 0;

  & > div:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  & > div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const DropdownCard = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 1em;
`;

const DropdownListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 100px;
  max-width: 400px;
  padding: 8px 1em;
  cursor: pointer;
  
  svg {
    fill: white;
  }
  
  span, span a {
    transition: color 300ms ease-in-out;
  }

  span {
    color: white;
    margin-left: 0.5em;
    
  }

  span a {
    color: white;
    text-decoration: none;
  }

  &:hover > div > span, &:hover > div > span a {
    color: ${props => props.theme.pallete.secondary}
  }
`;

const Dropdown = ({ options, children, placement, toggleOnAction, title, showOnEmpty }) => {
    const [showing, setShowing] = React.useState(false);
    const listRef = React.useRef(null);
    const wrappedComponentRef = React.useRef(null);
    const popperModifiers = {
      offset: {
        offset: "-3vw, 14"
      },
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
                  {title && <DropdownTitleContainer><h3>{title}</h3></DropdownTitleContainer>}
                  {(options.length === 0 && showOnEmpty) && <DropdownCard>{showOnEmpty}</DropdownCard>}
                  { options && options.map(option => (
                    <DropdownListItem key={options.indexOf(option)}>
                       <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }} onClick={() => {
                        if (typeof option.action === "function" && option.action !== undefined) {
                          option.action();
                        }
                          if (toggleOnAction) toggle();
                        }}>
                          {option.icon && React.cloneElement(option.icon, { fontSize: "1.5rem" })}
                          <span>{option.text}</span>
                       </div>
                      {option.component && React.cloneElement(option.component, { style: { margin: "0 0.5em" } })}
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showOnEmpty: PropTypes.element,
  options: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), icon: PropTypes.element, action: PropTypes.func, component: PropTypes.element })).isRequired,
  placement: PropTypes.oneOf(["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-end", "right-start", "left", "left-end", "left-start", "bottom", "bottom-end", "bottom-start"])
}

export default Dropdown;