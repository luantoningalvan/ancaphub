import React from 'react'
import { loadImage } from '../helpers/loadImage'

export default props => (
    <header>
        <nav className="grey darken-4 z-depth-0">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo hide-on-large-only">AncapHub</a>
                    <a href="#" data-target="slide-out" className="sidenav-trigger "><i className="material-icons">menu</i></a>
                    
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a className="dropdown-trigger" href="#!" data-target="account-menu">
                            <img src={loadImage('foto.jpg')} className="circle profile-image left" />
                            Luan
                            <i className="material-icons right">arrow_drop_down</i>
                            </a>

                            <ul id="account-menu" className="dropdown-content">
                                <li><a href="#!">Ver Perfil</a></li>
                                <li><a href="#!">Configurações</a></li>
                                <li className="divider"></li>
                                <li><a href="#!">Sair</a></li>
                            </ul>
                        </li>

                        <li><a href="#">Visitar Site</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
)