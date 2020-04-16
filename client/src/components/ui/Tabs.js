import React from 'react'
import Paper from './Paper'

const Tabs = ({children}) => {
  return (
    <Paper>
      <ul style={{ display: 'flex', padding: '0px 8px' }}>
        {children}
      </ul>
    </Paper>
  )
}

export default Tabs