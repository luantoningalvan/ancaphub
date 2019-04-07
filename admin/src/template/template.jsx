import React, { Component } from 'react'

import Header from './header'
import Sidenav from './sidenav'
import Main from './main'
import Footer from './footer'

// CSS
import 'materialize-css/dist/css/materialize.min.css'
import '../assets/css/main.css'

// JS
import 'materialize-css/dist/js/materialize.min.js'

// FONTS
import 'material-design-icons/iconfont/material-icons.css'

export default class Tempalte extends Component {

    componentDidMount(){
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
    
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
            coverTrigger: false
        });
    }

    render(){
        return(
            <div>
                <Header />
                <Sidenav />
                <Main>
                    {this.props.children}
                </Main>
                <Footer />
            </div>
        )
    }
} 