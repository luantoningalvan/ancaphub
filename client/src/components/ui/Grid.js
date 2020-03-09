import React from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";

// This implementation aims to be close to Bootstrap's grid layout implemenation
// and the structure is very similar to Material UI's one.
// see https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Grid/Grid.js Material UI's Grid component implementation
// see https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/dist/css/bootstrap-grid.css Bootstrap's CSS grid implementation

// Breakpoint keys
//const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"];

// For spacing properties
const SPACING_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// For determining grid item sizes
const SIZING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, "auto"];
const SIZING_LEVEL_NUMBER = SIZING_LEVELS.length - 2;

const makeGrid = (baseStyles = ``, breakpoint) => {
  let jss = ``;
  SIZING_LEVELS.forEach(sizing => {
    const classKey = `grid-${breakpoint}-${sizing}`;

    if (sizing === true || sizing === "auto") {
      jss += `
      .${classKey} {
        flex-basis: auto;
        flex-grow: 0;
        width: none;
      }
      `;
      return;
    }

    // Get element initial width in % relative to parent
    const initialWidth = `${Math.round((sizing / SIZING_LEVEL_NUMBER) * 10e7) /
      10e5}%`;

    jss += `
      .${classKey} {
        flex-basis: ${initialWidth};
        flex-grow: 0;
        max-width: ${initialWidth};
      }
    `;

    if (breakpoint === "xs") {
      // extra small doesn't need a media query; if it's passed alone, it covers every width
      baseStyles += jss;
    } else if (breakpoint === "sm") {
      // small breakpoint is from 600px to 960px
      baseStyles += `@media only screen and (min-width: 600px) { ${jss} }`;
    } else if (breakpoint === "md") {
      // medium breakpoint is from 960px to 1280px
      baseStyles += `@media only screen and (min-width: 601px) and (max-width: 1279px) { ${jss} }`;
    } else if (breakpoint === "lg") {
      // large is from 961px to 1919px
      baseStyles += `@media only screen and (min-width: 961px) and (max-width: 1919px) { ${jss} }`;
    } else if (breakpoint === "xl") {
      // extra large is from 1920px and above
      baseStyles += `@media only screen and (min-width: 1920px) { ${jss} }`;
    }
  });

  return baseStyles;
};

const offset = (val, divideBy = 1) => {
  // parse value from string
  const fl = parseFloat(val);
  // if 'px' is not present, or remove value and keep px
  const replacement = String(val).replace(String(fl), "");

  return `${fl / divideBy}${replacement || "px"}`;
};

const getSpacing = multiplier => {
  return 8 * multiplier;
};

const makeSpacing = breakpoint => {
  let jss = ``;

  SPACING_LEVELS.forEach(spacing => {
    const currentSpacing = getSpacing(spacing);

    if (!currentSpacing) return;

    jss += `
    .spacing-${breakpoint}-${spacing} {
      margin: -${offset(spacing, 2)};
      width: calc(100% + ${offset(spacing)});
    }
    `;
  });

  return jss;
};

const commonStyles = props => `
  /* handle flex direction */
  ${!props.direction ? "flex-direction: row" : ""};
  & > .direction-xs-column { flex-direction: column; }
  & > .direction-xs-column-reverse { flex-direction: column-reverse; }
  & > .direction-xs-row-reverse { flex-direction: row-reverse; }

  /* handle zero min width */
  & > .zeroMinWidth { min-width: 0; }
  
  /* handle nowrap */
  flex-wrap: ${props.wrap};
  
  /* handle align-items */
  & > .align-items-xs-stretch { align-items: stretch; }
  & > .align-items-xs-center { align-items: center; }
  & > .align-items-xs-flex-start { align-items: flex-start; }
  & > .align-items-xs-flex-end { align-items: flex-end; }
  & > .align-items-xs-baseline { align-items: baseline; }
  
  /* handle align-content */
  & > .align-content-xs-stretch { align-content: stretch; }
  & > .align-content-xs-center { align-content: center; }
  & > .align-content-xs-flex-start { align-content: flex-start; }
  & > .align-content-xs-flex-end { align-content: flex-end; }
  & > .align-content-xs-space-between { align-content: space-between; }
  & > .align-content-xs-space-around { align-content: space-around; }
  
  /* handle justify-content */
  & > .justify-xs-center { justify-content: center; }
  & > .justify-xs-flex-end { justify-content: flex-end; }
  & > .justify-xs-space-between { justify-content: space-between; }
  & > .justify-xs-space-around { justify-content: space-around; }
  & > .justify-xs-space-evenly { justify-content: space-evenly; }
  
  /* make spacing */
  ${makeSpacing("xs")}

  /* generate grids for each breakpoint */
  ${makeGrid(``, "xs")}
  ${makeGrid(``, "sm")}
  ${makeGrid(``, "md")}
  ${makeGrid(``, "lg")}
  ${makeGrid(``, "xl")}

`;

const propertyDefault = (prop, defaultValue) => {
  if (prop === undefined) {
    return defaultValue;
  } else return prop;
};

const generateClassNames = props => {
  const classNames = clsx({
    zeroMinWidth: props.zeroMinWidth,
    [`spacing-xs-${props.spacing}`]: props.spacing !== 0,
    [`direction-xs-${props.direction}`]: props.direction !== "row",
    [`wrap-xs-${props.wrap}`]: props.wrap !== "wrap",
    [`align-items-xs-${props.alignItems}`]: props.alignItems !== "stretch",
    [`align-content-xs-${props.alignContent}`]:
      props.alignContent !== "stretch",
    [`justify-xs-${props.justifyContent}`]:
      props.justifyContent !== "flex-start",
    [`grid-xs-${props.xs}`]: props.xs !== false,
    [`grid-sm-${props.sm}`]: props.sm !== false,
    [`grid-md-${props.md}`]: props.md !== false,
    [`grid-lg-${props.xs}`]: props.lg !== false,
    [`grid-xl-${props.xs}`]: props.xl !== false
  });
  return classNames;
};

export const GridContainerWrapper = styled.div`
  display: flex;
  ${props => commonStyles(props)}
  box-sizing: border-box;
  width: 100%;
`;

export const GridItemWrapper = styled.div`
  display: flex;
  ${props => commonStyles(props)}
  box-sizing: border-box;
  margin: 0;
`;

export const GridContainer = props => {
  // default prop values:
  let newProps = {
    alignContent: propertyDefault(props.alignContent, "stretch"),
    alignItems: propertyDefault(props.alignItems, "stretch"),
    direction: propertyDefault(props.direction, "row"),
    justifyContent: propertyDefault(props.justifyContent, "flex-start"),
    xs: propertyDefault(props.xs, false),
    sm: propertyDefault(props.sm, false),
    md: propertyDefault(props.md, false),
    lg: propertyDefault(props.lg, false),
    xl: propertyDefault(props.xl, false),
    spacing: propertyDefault(props.spacing, 0),
    wrap: propertyDefault(props.wrap, "wrap"),
    zeroMinWidth: propertyDefault(props.zeroMinWidth, false)
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

export const GridItem = props => {
  // default prop values:
  let newProps = {
    alignContent: propertyDefault(props.alignContent, "stretch"),
    alignItems: propertyDefault(props.alignItems, "stretch"),
    direction: propertyDefault(props.direction, "row"),
    justifyContent: propertyDefault(props.justifyContent, "flex-start"),
    xs: propertyDefault(props.xs, false),
    sm: propertyDefault(props.sm, false),
    md: propertyDefault(props.md, false),
    lg: propertyDefault(props.lg, false),
    xl: propertyDefault(props.xl, false),
    spacing: propertyDefault(props.spacing, 0),
    wrap: propertyDefault(props.wrap, "wrap"),
    zeroMinWidth: propertyDefault(props.zeroMinWidth, false)
  };

  Object.preventExtensions(newProps);

  return (
    <GridItemWrapper
      {...newProps}
      style={props.style}
      className={generateClassNames(newProps)}
    >
      {props.children}
    </GridItemWrapper>
  );
};
