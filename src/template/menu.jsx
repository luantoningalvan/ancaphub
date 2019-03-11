import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'

import App from '../app'
import Articles from '../articles'
import Podcasts from '../podcasts'
import Books from '../books'

export default props => (
  <div className="navbar-start">
    <Link to="/" className="navbar-item">Home</Link>
    <Link to="/livros" className="navbar-item">Livros</Link>
    <Link to="/artigos" className="navbar-item">Artigos</Link>
    <Link to="/podcasts" className="navbar-item">Podcasts</Link>

    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        Categorias
      </a>

      <div className="navbar-dropdown">
        <a className="navbar-item">
          About
        </a>
        <a className="navbar-item">
          Jobs
        </a>
        <a className="navbar-item">
          Contact
        </a>
        <hr className="navbar-divider" />
        <a className="navbar-item">
          Report an issue
        </a>
      </div>
    </div>
  </div>
)