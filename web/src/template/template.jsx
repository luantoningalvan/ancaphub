import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {connect} from 'react-redux'
import Header from './header'
import Menu from './menu'
import Main from './main'

/* CSS FILES */
import '../assets/css/common.css'
import CssBaseline from '@material-ui/core/CssBaseline';

/* JS FILES */
import '../assets/js/script.js'

const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#131313',
      },
      secondary: {
          main: '#f9a825',
      },
    },
});

function Template(props) {
  const [open, setOpen] = React.useState(true);
  const logged = props.auth.isAuthenticated

  function handleDrawerOpen() {
    (open) ? setOpen(false) : setOpen(true);
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header openDrawer={handleDrawerOpen} logged={logged}/>
      <Menu open={open} />
      <Main open={open}>
        {props.children}
      </Main>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Template)
