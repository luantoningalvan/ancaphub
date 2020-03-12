import PropTypes from "prop-types";
import clsx from "clsx";

// This file only provides basic functionality that is common to all grid components.
// It is NOT a component and can be moved to another folder in future.
// This implementation aims to be close to Bootstrap's grid layout implemenation
// and the structure is very similar to Material UI's one.
// The main differences are that the grid is split between two components and every class is already
// defined. Each one is applied conditionally instead of also being generated dynamically on component mount.
// see https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Grid/Grid.js Material UI's Grid component implementation
// see https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/dist/css/bootstrap-grid.css Bootstrap's CSS grid implementation

// For spacing properties
const SPACING_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// For determining grid item sizes
const SIZING_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, "auto"];
const SIZING_LEVEL_NUMBER = SIZING_LEVELS.length - 2;
const COMMON_BREAKPOINTS_PROPTYPE = [...SIZING_LEVELS, false];

// Prop types for both container and item components
export const commonPropTypes = {
  alignContent: PropTypes.oneOf([
    "stretch",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around"
  ]),
  alignItems: PropTypes.oneOf([
    "center",
    "flex-start",
    "flex-end",
    "stretch",
    "baseline"
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse"
  ]),
  justifyContent: PropTypes.oneOf([
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly"
  ]),
  xs: PropTypes.oneOf(COMMON_BREAKPOINTS_PROPTYPE),
  sm: PropTypes.oneOf(COMMON_BREAKPOINTS_PROPTYPE),
  md: PropTypes.oneOf(COMMON_BREAKPOINTS_PROPTYPE),
  lg: PropTypes.oneOf(COMMON_BREAKPOINTS_PROPTYPE),
  xl: PropTypes.oneOf(COMMON_BREAKPOINTS_PROPTYPE),
  spacing: PropTypes.oneOf(SPACING_LEVELS),
  zeroMinWidth: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const makeGrid = breakpoint => {
  let baseStyles = ``;
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
      baseStyles += `@media only screen and (min-width: 1280px) and (max-width: 1919px) { ${jss} }`;
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
      margin: -${offset(currentSpacing, 2)};
      width: calc(100% + ${offset(currentSpacing)});
      & > .item {
        padding: ${offset(currentSpacing, 2)};
      }
    }
    `;
  });

  return jss;
};

export const commonStyles = props => `
  /* handle flex direction */
  ${!props.flexDirection ? "flex-direction: row" : ""};
  & > .direction-xs-column { flex-direction: column; }
  & > .direction-xs-column-reverse { flex-direction: column-reverse; }
  & > .direction-xs-row-reverse { flex-direction: row-reverse; }

  /* handle zero min width */
  & > .zeroMinWidth { min-width: 0; }
  
  /* handle nowrap */
  flex-wrap: ${props.flexWrap};
  
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
  ${makeGrid("xs")}
  ${makeGrid("sm")}
  ${makeGrid("md")}
  ${makeGrid("lg")}
  ${makeGrid("xl")}

`;

export const propertyDefault = (prop, defaultValue) => {
  if (prop === undefined) {
    return defaultValue;
  } else return prop;
};

export const generateClassNames = props => {
  const classNames = clsx({
    zeroMinWidth: props.zeroMinWidth,
    [`spacing-xs-${props.spacing}`]: props.spacing !== 0,
    [`direction-xs-${props.flexDirection}`]: props.flexDirection !== "row",
    [`wrap-xs-${props.flexWrap}`]: props.flexWrap !== "wrap",
    [`align-items-xs-${props.alignItems}`]: props.alignItems !== "stretch",
    [`align-content-xs-${props.alignContent}`]:
      props.alignContent !== "stretch",
    [`justify-xs-${props.justifyContent}`]:
      props.justifyContent !== "flex-start",
    [`grid-xs-${props.xs}`]: props.xs !== false,
    [`grid-sm-${props.sm}`]: props.sm !== false,
    [`grid-md-${props.md}`]: props.md !== false,
    [`grid-lg-${props.lg}`]: props.lg !== false,
    [`grid-xl-${props.xl}`]: props.xl !== false
  });
  return classNames;
};
