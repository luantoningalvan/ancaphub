import React from 'react'
import { Box, TextField, Container, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from  'clsx';

const useStyles = makeStyles(theme => ({
  message: {
    width: 'auto', 
    maxWidth: '50%', 
    padding: 10, 
    borderRadius: 5,
  },
  messageBox: {
    display: 'flex',
    margin: '10px 0px'
  },
  messageSendedBox: {
    justifyContent: 'flex-end',
  },
  messageSended: {  
    background: "#0240d4", 
    color: 'white'
  },
  messageReceivedBox: {
    justifyContent: 'flex-start',
  },
  messageReceived: {
    background: theme.palette.background, 
  },
  messageInput: {
    background: "#f4f4f4",
    borderTop: '1px solid #ccc', 
    position: 'fixed',
    bottom: 0, 
    right:0,
    height: '50px',
    width: 'calc(100% - 240px)',
    display:"flex", 
    alignItems:"center",
  }
}))
export default props => {
  const classes = useStyles()
  
  return (
    <Box>
      <Box>
        <Container>
          <Box display="flex" flexDirection="column" marginBottom="64px" height="calc(100vh - 128px)">
            <div className={clsx(classes.messageBox, classes.messageSendedBox)}>
              <span className={clsx(classes.message, classes.messageSended)}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem.
              </span>
            </div>

            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
                <span style={{display: 'block'}}><b>Tiago</b></span>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageSendedBox)}>
              <span className={clsx(classes.message, classes.messageSended)}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasell
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
                <span style={{display: 'block'}}><b>Rodrigo</b></span>
                Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
                <span style={{display: 'block'}}><b>Tiago</b></span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageSendedBox)}>
              <span className={clsx(classes.message, classes.messageSended)}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageSendedBox)}>
              <span className={clsx(classes.message, classes.messageSended)}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageSendedBox)}>
              <span className={clsx(classes.message, classes.messageSended)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
            <div className={clsx(classes.messageBox, classes.messageReceivedBox)}>
              <span className={clsx(classes.message, classes.messageReceived)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc lectus. Mauris id blandit nisl. Phasellus eu condimentum est. In vel euismod libero. Aliquam sit amet commodo dolor. Suspendisse nunc neque, bibendum quis hendrerit non, dictum eu sem. Suspendisse fringilla nunc nec ex lobortis, vitae sagittis leo dictum.
              </span>
            </div>
          </Box>
        </Container>
      </Box>
      <Box className={classes.messageInput}>
        <Container>
          <InputBase
            placeholder="Mensagem"
            fullWidth
          />
        </Container>
      </Box>
    </Box>
  )
}