import React from 'react'

const Collapse = ({ expanded, children }) => {
  if (expanded) {
    return children
  } else {
    return <></>
  }
}

export default Collapse