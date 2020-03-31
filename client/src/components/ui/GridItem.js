import React from 'react';
import styled from 'styled-components';
import {
  propertyDefault,
  commonPropTypes,
  generateClassNames,
  commonStyles,
} from './Grid';

const GridItemWrapper = styled.div`
  display: flex;
  ${(props) => commonStyles(props)}
  box-sizing: border-box;
  margin: 0;
`;

GridItemWrapper.propTypes = commonPropTypes;

const GridItem = (props) => {
  // default prop values:
  const newProps = {
    alignContent: propertyDefault(props.alignContent, 'flex-start'),
    alignItems: propertyDefault(props.alignItems, 'flex-start'),
    flexDirection: propertyDefault(props.direction, 'row'),
    justifyContent: propertyDefault(props.justifyContent, 'flex-start'),
    xs: propertyDefault(props.xs, false),
    sm: propertyDefault(props.sm, false),
    md: propertyDefault(props.md, false),
    lg: propertyDefault(props.lg, false),
    xl: propertyDefault(props.xl, false),
    /**
     * Using 'nowrap' is not recommended as it can cause flow issues and
     * some weird bugs, but it's up to you
     */
    flexWrap: propertyDefault(props.wrap, 'wrap'),
    zeroMinWidth: propertyDefault(props.zeroMinWidth, false),
  };

  Object.preventExtensions(newProps);

  return (
    <GridItemWrapper
      {...newProps}
      style={props.style}
      className={`${generateClassNames(newProps)} item`}
    >
      {props.children}
    </GridItemWrapper>
  );
};

export default GridItem;
