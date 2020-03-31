import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const hiddenPropTypes = {
  from: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  to: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  only: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
};

const breakpointBoundaries = [
  {
    code: 'xs',
    boundaries: [0, 599],
  },
  {
    code: 'sm',
    boundaries: [600, 959],
  },
  {
    code: 'md',
    boundaries: [960, 1279],
  },
  {
    code: 'lg',
    boundaries: [1280, 1919],
  },
  {
    code: 'xl',
    boundaries: [1920, -1],
  },
];

const makeMediaQueries = () => {
  let mediaQueryString = '';

  // For single breakpoints
  breakpointBoundaries.forEach((breakpoint) => {
    if (breakpoint.code !== 'xl') {
      mediaQueryString += `
                .hide-only-on-${breakpoint.code} {
                    visibility: visible;
                }
                @media only screen and (min-width: ${breakpoint.boundaries[0]}px) and (max-width: ${breakpoint.boundaries[1]}px) {
                    .hide-only-on-${breakpoint.code} {
                        visibility: hidden;
                    }
                }
            `;
    } else {
      mediaQueryString += `
            .hide-only-on-xl {
                visiblity: visible;
            }
                @media only screen and (min-width: ${breakpoint.boundaries[0]}px) {
                .hide-only-on-xl {
                       visiblity: hidden;
                   }
                }
            `;
    }
  });

  // From...to
  for (let i = 0; i < breakpointBoundaries.length; i++) {
    for (let j = 1; j < breakpointBoundaries.length; j++) {
      if (i === j) continue;
      mediaQueryString += `
            .hide-from-${breakpointBoundaries[i].code}-to-${breakpointBoundaries[j].code} {
                visibility: visible;
            }
            
            @media only screen and (min-width: ${breakpointBoundaries[i].boundaries[0]}px) and (max-width: ${breakpointBoundaries[j].boundaries[1]}px) {
                    .hide-from-${breakpointBoundaries[i].code}-to-${breakpointBoundaries[j].code} {
                        visibility: hidden;
                    }
                }
            `;
    }
  }

  return mediaQueryString;
};

const HiddenWrap = styled.div`
  /* Handle hidden/visible */

  ${makeMediaQueries()}
`;

const Hidden = (props) => {
  const cs = clsx({
    [`hide-only-on-${props.only}`]: props.only !== undefined,
    [`hide-from-${props.from}-to-${props.to}`]:
      props.from !== false && props.to !== false && props.only === undefined,
  });
  return (
    <HiddenWrap>
      <div className={cs}>{props.children}</div>
    </HiddenWrap>
  );
};

Hidden.propTypes = hiddenPropTypes;

export default Hidden;
