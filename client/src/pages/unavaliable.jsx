import React from 'react'
import { Box, Container } from '@material-ui/core'
import UnavaliableContent from '../components/error/unavaliableContent'

export default props => (
  <Container>
    <Box mt={2}>
      <UnavaliableContent />
    </Box>
  </Container>
)