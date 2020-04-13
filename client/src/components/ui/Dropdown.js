import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Reference, Manager, Popper } from 'react-popper';

const clickAwayListener = (ref, action) => {
  function handleTriggerAction(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      action();
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    document.addEventListener('mousedown', handleTriggerAction);
    return function cleanup() {
      document.removeEventListener('mousedown', handleTriggerAction);
    };
  });
};

const DropdownCard = styled.div`
  max-width: 400px;
  display: flex;
  background-color: ${(props) => props.theme.palette.paper};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Dropdown = ({
  children, placement, offsetX, offsetY, toggle,
}) => {
  const [showing, setShowing] = React.useState(false);
  const listRef = React.useRef(null);
  const wrappedComponentRef = React.useRef(null);
  const popperModifiers = {
    offset: {
      offset: `${offsetX || 0}, ${offsetY || 0}`,
    },
    shift: {
      enabled: true,
    },
    flip: {
      enabled: true,
      flipVariationsByContent: true,
      behavior: 'flip',
    },
    preventOverflow: {
      padding: 0,
    },
  };

  const setListRef = React.useCallback((node, ref) => {
    listRef.current = node;
    return ref(node);
  }, []);

  const setWrappedComponentRef = React.useCallback(
    (node, ref) => {
      wrappedComponentRef.current = node;
      return ref(node);
    },
    [wrappedComponentRef],
  );

  const handleToggle = () => {
    setShowing(!showing);
  };

  clickAwayListener(listRef, handleToggle);

  return (
    <Manager>
      <div>
        <Reference>
          {({ ref }) => (
            <div>
              {React.cloneElement(toggle, {
                onClick: () => handleToggle(),
                ref: (node) => setWrappedComponentRef(node, ref),
              })}
            </div>
          )}
        </Reference>
        {showing && (
          <Popper placement={placement} modifiers={popperModifiers}>
            {({ ref, style }) => (
              <DropdownCard
                ref={(node) => setListRef(node, ref)}
                style={style}
                data-placement={placement}
              >
                {children}
              </DropdownCard>
            )}
          </Popper>
        )}
      </div>
    </Manager>
  );
};

Dropdown.propTypes = {
  // Children is what goes inside the popper
  children: PropTypes.node.isRequired,
  // This is the anchor element
  toggle: PropTypes.element.isRequired,
  // Offset defines distance from the popper to anchor element
  offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Where you want the popper to appear
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-end',
    'right-start',
    'left',
    'left-end',
    'left-start',
    'bottom',
    'bottom-end',
    'bottom-start',
  ]),
};

export default Dropdown;
