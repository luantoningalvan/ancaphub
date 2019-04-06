import React from 'react'
import '../assets/css/header.css'
import Menu from './menu'
import {loadImage} from '../helpers/loadImage'
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom'


export default props => (
  <header>
    <nav className="navbar is-black" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src={loadImage('logo.png')} height="28" />
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">

          <Menu />

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/cadastro" className="button is-warning">Cadastro</Link>
                <Link to="/login" className="button is-white">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

