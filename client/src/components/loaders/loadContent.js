import React from 'react'
import Loader from './loadingItems'

export default props => (
  <>
    {props.loading ? (
      <Loader />
    ) : (
        <>
          {props.children}
        </>
      )}
  </>
)