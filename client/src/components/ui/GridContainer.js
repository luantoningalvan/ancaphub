import React from 'react';
import styled from 'styled-components';
import {
  propertyDefault,
  commonPropTypes,
  generateClassNames,
  commonStyles,
  makeSpacing,
} from './Grid';

const GridContainerWrapper = styled.div`
  display: flex;
  ${(props) => commonStyles(props)}
  ${(props) => makeSpacing(props.spacing)}
  box-sizing: border-box;
  width: 100%;
`;

GridContainerWrapper.propTypes = commonPropTypes;

const GridContainer = ({
  alignContent, alignItems, flexDirection, justifyContent,
  xs, sm, md, lg, xl,
  spacing, flexWrap, zeroMinWidth,
  children,
  style,
}) => {
  // default prop values:
  const newProps = {
    alignContent: propertyDefault(alignContent, 'stretch'),
    alignItems: propertyDefault(alignItems, 'stretch'),
    flexDirection: propertyDefault(flexDirection, 'row'),
    justifyContent: propertyDefault(justifyContent, 'flex-start'),
    xs: propertyDefault(xs, false),
    sm: propertyDefault(sm, false),
    md: propertyDefault(md, false),
    lg: propertyDefault(lg, false),
    xl: propertyDefault(xl, false),
    spacing: propertyDefault(spacing, 0),
    flexWrap: propertyDefault(flexWrap, 'wrap'),
    zeroMinWidth: propertyDefault(zeroMinWidth, false),
  };

  Object.preventExtensions(newProps);

  return (
    <GridContainerWrapper
      {...newProps}
      style={style}
      className={generateClassNames(newProps)}
    >
      {children}
    </GridContainerWrapper>
  );
};

export default GridContainer;
