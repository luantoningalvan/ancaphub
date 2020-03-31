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

const GridContainer = (props) => {
  // default prop values:
  const newProps = {
    alignContent: propertyDefault(props.alignContent, 'stretch'),
    alignItems: propertyDefault(props.alignItems, 'stretch'),
    flexDirection: propertyDefault(props.flexDirection, 'row'),
    justifyContent: propertyDefault(props.justifyContent, 'flex-start'),
    xs: propertyDefault(props.xs, false),
    sm: propertyDefault(props.sm, false),
    md: propertyDefault(props.md, false),
    lg: propertyDefault(props.lg, false),
    xl: propertyDefault(props.xl, false),
    spacing: propertyDefault(props.spacing, 0),
    flexWrap: propertyDefault(props.flexWrap, 'wrap'),
    zeroMinWidth: propertyDefault(props.zeroMinWidth, false),
  };

  Object.preventExtensions(newProps);

  return (
    <GridContainerWrapper
      {...newProps}
      style={props.style}
      className={generateClassNames(newProps)}
    >
      {props.children}
    </GridContainerWrapper>
  );
};

export default GridContainer;
