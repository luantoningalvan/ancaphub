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

const GridItem = ({
  alignContent, alignItems, direction, justifyContent,
  xs, sm, md, lg, xl,
  zeroMinWidth, wrap,
  children,
  style,
}) => {
  // default prop values:
  const newProps = {
    alignContent: propertyDefault(alignContent, 'flex-start'),
    alignItems: propertyDefault(alignItems, 'flex-start'),
    flexDirection: propertyDefault(direction, 'row'),
    justifyContent: propertyDefault(justifyContent, 'flex-start'),
    xs: propertyDefault(xs, false),
    sm: propertyDefault(sm, false),
    md: propertyDefault(md, false),
    lg: propertyDefault(lg, false),
    xl: propertyDefault(xl, false),
    /**
     * Using 'nowrap' is not recommended as it can cause flow issues and
     * some weird bugs, but it's up to you
     */
    flexWrap: propertyDefault(wrap, 'wrap'),
    zeroMinWidth: propertyDefault(zeroMinWidth, false),
  };

  Object.preventExtensions(newProps);

  return (
    <GridItemWrapper
      {...newProps}
      style={style}
      className={`${generateClassNames(newProps)} item`}
    >
      {children}
    </GridItemWrapper>
  );
};

export default GridItem;
