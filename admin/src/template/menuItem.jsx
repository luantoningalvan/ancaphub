import React from 'react'
import { Link } from "react-router-dom"

export default props => (
    <li>
        <Link to={props.link} className="waves-effect waves-blue">
            <i className="material-icons left">{props.icon}</i>{props.label}
        </Link>
    </li>
)