import React from 'react'
import '../assets/css/header.css'
import {loadImage} from '../helpers/loadImage'

export default props => (
  <header>
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo"><img src={loadImage('logo.png')} height="50px"/></a>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
      </div>
    </nav>

    <ul className="sidenav" id="mobile-demo">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">Javascript</a></li>
      <li><a href="mobile.html">Mobile</a></li>
    </ul>
  </header>
)

