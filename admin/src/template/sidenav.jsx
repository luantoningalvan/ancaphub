import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <aside>
        <ul id="slide-out" className="sidenav sidenav-fixed z-depth-0">
            <li className="sidenav-header grey darken-4">
                <h1>Ancap<span style={{color: 'yellow'}}>Hub</span></h1>
            </li>
            <MenuItem link="/" icon="dashboard" label="Dashboard" />
            <MenuTree icon="library_books" label="Livros">
                <MenuItem link="/books" label="Ver Livros" icon="list" />
                <MenuItem link="/books/add" label="Adicionar Livro" icon="add" />
            </MenuTree>
        </ul>
    </aside>
)