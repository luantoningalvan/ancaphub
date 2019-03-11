import React from 'react'
import Header from './header'

/* CSS FILES */
import '../assets/css/common.css'
import 'bulma/css/bulma.min.css'

/* JS FILES */
import '../assets/js/script.js'

import MaterialIcon from 'material-icons-react';

export default props => (
  <div>
    <Header />
    <main>
      {props.children}
    </main>
  </div>
)

