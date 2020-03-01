import React from 'react'
import Loader from './loadingItems'
import { Box } from "@material-ui/core"

export default props => (
  <>
    {props.loading ? (
      <Box py={3}>
        <Loader />
      </Box>
    ) : (
        <>
          {props.children}
        </>
      )}
  </>
)