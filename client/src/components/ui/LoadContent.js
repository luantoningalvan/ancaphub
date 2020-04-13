import React from 'react'
import Paper from './Paper'
import Loader from './Loader'

export default ({ loading, children }) => (
  <>
    {loading ? (
      <Paper style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loader />
      </Paper>
    ) : (
      <>
      {children}
      </>
    )}
  </>
)